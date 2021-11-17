const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      comment: {
        type: DataTypes.TEXT,
      },
      like: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
