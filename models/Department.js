module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("Department", {
      DepartmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      DepartmentName: DataTypes.STRING,
    });
  
    Department.associate = (models) => {
      Department.hasMany(models.JobTitle, { foreignKey: 'DepartmentID' });
      Department.hasMany(models.Supervisor, { foreignKey: 'DepartmentID' });
      Department.hasMany(models.Engagement, { foreignKey: 'DepartmentID' });
    };
  
    return Department;
  };
  