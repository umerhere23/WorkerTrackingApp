// models/Engagement.js
module.exports = (sequelize, DataTypes) => {
    const Engagement = sequelize.define("Engagement", {
      EngagementID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      EmployeeID: DataTypes.INTEGER,
      DepartmentID: DataTypes.INTEGER,
      JobTitleID: DataTypes.INTEGER,
      StartDate: DataTypes.DATEONLY,
      EndDate: DataTypes.DATEONLY,
      SupervisorID: DataTypes.INTEGER,
      DeptManagerEmail: DataTypes.STRING,
      HRContactEmail: DataTypes.STRING,
      Status: DataTypes.STRING, // 'Active' or 'Ended'
    });
  
    Engagement.associate = (models) => {
      Engagement.belongsTo(models.Employee, { foreignKey: 'EmployeeID' });
      Engagement.belongsTo(models.Department, { foreignKey: 'DepartmentID' });
      Engagement.belongsTo(models.JobTitle, { foreignKey: 'JobTitleID' });
      Engagement.belongsTo(models.Supervisor, { foreignKey: 'SupervisorID' });
    };
  
    return Engagement;
  };
  