"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class resturant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resturant.init(
    {
      seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      service: { type: DataTypes.STRING, allowNull: false },
      created: { type: DataTypes.STRING, },
      recordStatus: {
        type: DataTypes.ENUM,
        values: ["LATEST", "UPDATED", "DELETED"],
        allowNull: false,
        defaultValue: "LATEST",
      },
    },
    {
      sequelize,
      modelName: "resturant",
      initialAutoIncrement: 1000000,
      tableName: "resturant_MySQl",
      underscored: true,
      freezeTableName: true,
    }
  );
  return resturant;
};
