const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

const {
  createTaskService,
  updateRecordStatus,
} = require("../../services/task");
const { createUserService } = require("../../services/users");
const { whereINDataType, wherINJSON } = require("../../shared/queryBuilder");

const createTask = async (req, res) => {
  try {
    let { name, reminder, date, users } = req.body;
    if (!users) users = [];
    const id = uuid.v4();
    const taskDTO = {
      id,
      name,
      reminder,
      date,
    };
    const newTask = await createTaskService(taskDTO);
    const addedUsers = await assigneUsersToTask(id, users);
    res.status(201).json({ ...newTask.dataValues, users: addedUsers });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const getTasks = async (req, res) => {
  try {
    let { id, name, reminder, date, dateFrom, dateTo, userId, recordStatus } =
      req.body;
    if (!recordStatus) recordStatus = "LATEST";
    let dateQuery;
    if (dateFrom || dateTo) {
      dateQuery = setCorrentQueryAccordRange(dateFrom, dateTo);
      console.log(dateQuery, "dateQuery");
    }
    /////////
    let tasksIdsFromUserId;
    if (userId) tasksIdsFromUserId = await findTasksIdsByUserId(userId);
    let tasks = await sequelize.models.Task.findAndCountAll({
      where: {
        [Op.and]: [
          id ? whereINDataType("id", "in", id) : "",
          name ? whereINDataType("name", "like", name) : "",
          dateQuery ? whereINDataType(...dateQuery) : "",
          tasksIdsFromUserId
            ? whereINDataType("id", "in", tasksIdsFromUserId)
            : "",
          whereINDataType("recordStatus", "eq", recordStatus),
        ],
      },
    });
    tasks.rows = await getUsersForTasks(tasks.rows);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    await updateRecordStatus("DELETED", id);
    const task = await sequelize.models.Task.findOne({
      where: {
        id: id,
        recordStatus: "DELETED",
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id, name, reminder, date } = req.body;
    const oldTask = await sequelize.models.Task.findOne({
      where: {
        id: id,
        recordStatus: "LATEST",
      },
    });
    await updateRecordStatus("UPDATED", id);
    const taskDTO = {
      id,
      name: name ? name : oldTask.name,
      reminder: reminder ? reminder : oldTask.reminder,
      date: date ? date : oldTask.date,
    };
    const newTask = await createTaskService(taskDTO);
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};

const setCorrentQueryAccordRange = (dueDateFrom, dueDateTO) => {
  try {
    if (!dueDateFrom) return ["date", "lte", dueDateTO];
    else if (!dueDateTO) return ["date", "gte", dueDateFrom];
    else return ["date", "between", [dueDateFrom, dueDateTO]];
  } catch (error) {
    throw error;
  }
};

const assigneUsersToTask = async (id, users) => {
  try {
    // we  assume  the  users  array will reveive  as  [ {id:"abc" , name:"firas"}]
    let response = [];
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      const userDTO = {
        id: uuid.v4(),
        taskId: id,
        user: element,
      };
      const newUser = await createUserService(userDTO);
      response.push(newUser);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const getUsersForTasks = async (tasks) => {
  try {
    let response = [];
    for (let i = 0; i < tasks.length; i++) {
      const element = tasks[i];
      const users = await sequelize.models.Users.findAll({
        where: {
          recordStatus: "LATEST",
          taskId: element.id,
        },
      });
      response.push({ ...element.dataValues, users });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const findTasksIdsByUserId = async (id) => {
  try {
    const users = await sequelize.models.Users.findAll({
      where: {
        [Op.and]: [
          whereINDataType("recordStatus", "eq", "LATEST"),
          wherINJSON("user", "eq", "id", id),
        ],
      },
    });
    const arr = users.map((ele) => ele.taskId);
    console.log(arr);
    return arr;
  } catch (error) {}
};
