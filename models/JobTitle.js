module.exports = (sequelize, DataTypes) => {
    const JobTitle = sequelize.define("JobTitle", {
      JobTitleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Title: DataTypes.STRING,
      DepartmentID: DataTypes.INTEGER,
    });
  
    JobTitle.associate = (models) => {
      JobTitle.belongsTo(models.Department, { foreignKey: 'DepartmentID' });
      JobTitle.hasMany(models.Engagement, { foreignKey: 'JobTitleID' });
    };
  
    return JobTitle;
  };
  