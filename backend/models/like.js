module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
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
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
  });
  return Like;
};
