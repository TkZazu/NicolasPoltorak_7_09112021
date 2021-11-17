const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: "/images/profil/icon.png",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
