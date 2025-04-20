module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
      EmployeeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FullName: DataTypes.STRING,
      ContactInfo: DataTypes.STRING,
    });
  
    Employee.associate = (models) => {
      Employee.hasMany(models.Engagement, { foreignKey: 'EmployeeID' });
    };
  
    return Employee;
  };
  