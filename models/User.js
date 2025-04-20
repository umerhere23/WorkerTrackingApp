module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FullName: DataTypes.STRING,
      Role: DataTypes.ENUM("HR", "Supervisor", "Manager"),
      Email: DataTypes.STRING,
      PasswordHash: DataTypes.STRING,
    });
  
    return User;
  };
  