const { sequelize } = require("../models/index");

const createUserService = async (userDTO) => {
  try {
    return await sequelize.models.Users.create(userDTO);
  } catch (error) {
    throw error;
  }
};

// const updateRecordStatus = async (newStatus, id) => {
//   try {
//     return await sequelize.models.Task.update(
//       {
//         recordStatus: newStatus,
//       },
//       {
//         where: {
//           id: id,
//           recordStatus: "LATEST",
//         },
//       }
//     );
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  createUserService,
  //   updateRecordStatus,
};
