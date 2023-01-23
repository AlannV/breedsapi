const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unknown",
      },
    },
    { timestamps: false }
  );
};
