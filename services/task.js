const { sequelize } = require("../models/index");

const createTaskService = async (TaskDTO) => {
  try {
    return await sequelize.models.Task.create(TaskDTO);
  } catch (error) {
    throw error;
  }
};

const updateRecordStatus = async (newStatus, id) => {
  try {
    return await sequelize.models.Task.update(
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
  createTaskService,
  updateRecordStatus,
};
