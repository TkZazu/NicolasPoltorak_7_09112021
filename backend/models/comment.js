module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
  });
  return Comment;
};
