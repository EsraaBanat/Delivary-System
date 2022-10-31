const { sequelize } = require("../models/index");

const createNewResturant = async (ResturantDTO) => {
  try {
    return await sequelize.models.resturant.create(ResturantDTO);
  } catch (error) {
    throw error;
  }
};

const updateRecordStatus = async (newStatus, id) => {
  try {
    return await sequelize.models.resturant.update(
      {
        recordStatus: newStatus,
      },
      {
        where: {
          id: id,
          recordStatus: "LATEST",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewResturant,
  updateRecordStatus,
};
