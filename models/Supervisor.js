module.exports = (sequelize, DataTypes) => {
  const Supervisor = sequelize.define("Supervisor", {
    SupervisorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FullName: DataTypes.STRING,
    Email: DataTypes.STRING,
    DepartmentID: DataTypes.INTEGER,
  }, {
    timestamps: true  
  });

  Supervisor.associate = (models) => {
    Supervisor.belongsTo(models.Department, { foreignKey: 'DepartmentID' });
    Supervisor.hasMany(models.Engagement, { foreignKey: 'SupervisorID' });
  };

  return Supervisor;
};
