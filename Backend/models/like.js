const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {}

  Like.init(
    {
      like: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
