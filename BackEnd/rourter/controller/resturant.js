const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

const {
  createNewResturant,
  updateRecordStatus,
} = require("../../services/resturant");
const { createDelivery } = require("../../services/delivery");
const { whereINDataType, wherINJSON } = require("../../shared/queryBuilder");

const createResturant = async (req, res) => {
  try {
    let { name, service, delivaries } = req.body;
    if (!delivaries) delivaries = [];
    let [currentDate, currentTime] = getCurrentDateAndTime();
    const created = currentDate + " " + currentTime;
    const id = uuid.v4();
    const resturantDTO = {
      id,
      name,
      created,
      service,
    };
    const newResturant = await createNewResturant(resturantDTO);
    const addedDelivaries = await chooseDelivary(id, delivaries);
    res
      .status(201)
      .json({ ...newResturant.dataValues, delivaries: addedDelivaries });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const getResturants = async (req, res) => {
  try {
    let { id, name, delivaryId, recordStatus, offset, limit } = req.body;
    if (!recordStatus) recordStatus = "LATEST";
    /////////
    if (limit && offset) {
      offset = (offset - 1) * limit;
    }
    /////////
    let resturantIdsFromDelivaryId;
    if (delivaryId)
      resturantIdsFromDelivaryId = await findResturantIdsBydelivaryId(
        delivaryId
      );
    let resturants = await sequelize.models.resturant.findAndCountAll({
      where: {
        [Op.and]: [
          id ? whereINDataType("id", "in", id) : "",
          name ? whereINDataType("name", "like", name) : "",
          resturantIdsFromDelivaryId
            ? whereINDataType("resturantId", "in", resturantIdsFromDelivaryId)
            : "",
          whereINDataType("recordStatus", "eq", recordStatus),
        ],
      },
      limit,
      offset,
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["created", "ASC"],
      ],
    });
    resturants.rows = await getDelivariesForResturants(resturants.rows);
    res
      .status(200)
      .json({ pages: Math.ceil(resturants.count / limit), ...resturants });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const deleteResturant = async (req, res) => {
  try {
    const { id } = req.body;
    await updateRecordStatus("DELETED", id);
    const resturant = await sequelize.models.resturant.findOne({
      where: {
        id: id,
        recordStatus: "DELETED",
      },
    });
    await updateDeliveriesStatusByResturantId(id, "delivary", "DELETED");
    res.status(200).json(resturant);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.stack);
  }
};

const updateResturant = async (req, res) => {
  try {
    const { id, name, service, delivaries } = req.body;
    const oldResturant = await sequelize.models.resturant.findOne({
      where: {
        id: id,
        recordStatus: "LATEST",
      },
    });
    await updateRecordStatus("UPDATED", id);
    const resturantDTO = {
      id,
      name: name ? name : oldResturant.name,
      service: service ? service : oldResturant.service,
      created: oldResturant.created,
    };
    const newResturant = await createNewResturant(resturantDTO);
    // console.log(newResturant);
    await updateDeliveriesStatusByResturantId(id, "delivary", "UPDATED");
    if (delivaries) {
      await chooseDelivary(id, delivaries);
    }

    res.status(200).json(newResturant);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.stack);
  }
};

module.exports = {
  createResturant,
  getResturants,
  deleteResturant,
  updateResturant,
};

const chooseDelivary = async (id, deliveries) => {
  try {
    // console.log(deliveries,"deliveries");
    // we  assume  the  deliveries  array will reveive  as  [ {id:"abc" , name:"firas"}]
    let response = [];
    for (let i = 0; i < deliveries.length; i++) {
      const element = deliveries[i];
      const deliveryDTO = {
        id: uuid.v4(),
        resturantId: id,
        delivaryPerson: element,
      };
      const newDelivery = await createDelivery(deliveryDTO);
      response.push(newDelivery);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const getDelivariesForResturants = async (resturants) => {
  try {
    let response = [];
    for (let i = 0; i < resturants.length; i++) {
      const element = resturants[i];
      const delivaries = await sequelize.models.delivary.findAll({
        where: {
          recordStatus: "LATEST",
          resturantId: element.id,
        },
      });
      response.push({ ...element.dataValues, delivaries });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const findResturantIdsBydelivaryId = async (id) => {
  try {
    console.log(id, "lllll");
    const users = await sequelize.models.delivary.findAll({
      where: {
        [Op.and]: [
          //Here BUGGG
          whereINDataType("recordStatus", "eq", "LATEST"),
          wherINJSON("delivaryPerson", "eq", "id", id),
        ],
      },
    });
    const arr = users.map((ele) => ele.resturantId);
    console.log(arr, "kkkk");
    return arr;
  } catch (error) {}
};

const updateDeliveriesStatusByResturantId = async (
  resturantId,
  modelname,
  recordStatus
) => {
  try {
    return await sequelize.models.delivary.update(
      {
        recordStatus: recordStatus,
      },
      {
        where: { resturantId, recordStatus: "LATEST" },
      }
    );
  } catch (error) {
    throw error;
  }
};

const getCurrentDateAndTime = () => {
  try {
    // this function dont take any parametrs and its return the current
    // date and time
    let today = new Date();
    let CurrentDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);
    let hour =
      today.getHours() + "".length == 1
        ? "0" + today.getHours()
        : today.getHours() + "";
    let min = today.getMinutes() + "";
    if (hour.length === 1) hour = "0" + hour;
    if (min.length === 1) min = "0" + min;
    let currentTime = hour + ":" + min;
    return [CurrentDate, currentTime];
  } catch (error) {
    throw error;
  }
};
