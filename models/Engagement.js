module.exports = (sequelize, DataTypes) => {
  const Engagement = sequelize.define("Engagement", {
    EngagementID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    JobTitleID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    SupervisorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DeptManagerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    HRContactEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Active', 'Ended']]
      }
    }
  }, {
    timestamps: true, 
  });

  Engagement.associate = (models) => {
    Engagement.belongsTo(models.Employee, { foreignKey: 'EmployeeID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Engagement.belongsTo(models.Department, { foreignKey: 'DepartmentID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Engagement.belongsTo(models.JobTitle, { foreignKey: 'JobTitleID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Engagement.belongsTo(models.Supervisor, { foreignKey: 'SupervisorID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };

  return Engagement;
};
