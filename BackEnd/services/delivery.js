const { sequelize } = require("../models/index");

const createDelivery = async (delivaryDTO) => {
  try {
    return await sequelize.models.delivary.create(delivaryDTO);
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
  createDelivery,
  //   updateRecordStatus,
};
