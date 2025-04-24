const { Engagement, Employee, Department, JobTitle, Supervisor } = require('../models');
const { sendEngagementAlert } = require('../services/notificationService');

const nodemailer = require('nodemailer');

exports.getAllEngagements = async (req, res) => {
  try {
    const engagements = await Engagement.findAll({
      include: [
        { model: Employee },
        { model: Department },
        { model: JobTitle },
        { model: Supervisor }
      ],
      order: [['StartDate', 'DESC']]  
    });
    res.status(200).json(engagements);  
  } catch (error) {
    console.error("Error fetching engagements:", error);
    res.status(500).json({ error: "Failed to fetch engagements" });  
  }
};
exports.getAllEngagements = async (req, res) => {
  try {
    const engagements = await Engagement.findAll({
      include: [
        { model: Employee },
        { model: Department },
        { model: JobTitle },
        { model: Supervisor }
      ],
      order: [['StartDate', 'DESC']]
    });
    res.status(200).json(engagements);
  } catch (error) {
    console.error("Error fetching engagements:", error);
    res.status(500).json({ error: "Failed to fetch engagements" });
  }
};


exports.createEngagement = async (req, res) => {
  try {
    const {
      EmployeeID,
      DepartmentID,
      JobTitleID,
      StartDate,
      EndDate,
      SupervisorID,
      DeptManagerEmail,
      HRContactEmail,
      Status
    } = req.body;

    const newEngagement = await Engagement.create({
      EmployeeID,
      DepartmentID,
      JobTitleID,
      StartDate,
      EndDate,
      SupervisorID,
      DeptManagerEmail,
      HRContactEmail,
      Status
    });

    // Send email after successful creation
    const today = new Date();
    const endDate = new Date(newEngagement.EndDate);
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    await sendEngagementAlert(newEngagement, daysRemaining);

    res.status(201).json(newEngagement);
  } catch (error) {
    console.error("Error creating engagement:", error);
    res.status(500).json({ error: "Failed to create engagement" });
  }
};


exports.getEngagementById = async (req, res) => {
  try {
    const { id } = req.params;

    const engagement = await Engagement.findByPk(id, {
      include: [
        { model: Employee },
        { model: Department },
        { model: JobTitle },
        { model: Supervisor }
      ]
    });

    if (!engagement) {
      return res.status(404).json({ error: "Engagement not found" });
    }

    res.status(200).json(engagement);
  } catch (error) {
    console.error("Error fetching engagement:", error);
    res.status(500).json({ error: "Failed to fetch engagement" });
  }
}; 

exports.updateEngagement = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Engagement.update(req.body, {
      where: { EngagementID: id }
    });

    if (!updated) {
      return res.status(404).json({ error: "Engagement not found or nothing changed" });
    }

    const updatedEngagement = await Engagement.findByPk(id);
    res.status(200).json(updatedEngagement);
  } catch (error) {
    console.error("Error updating engagement:", error);
    res.status(500).json({ error: "Failed to update engagement" });
  }
};

exports.deleteEngagement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Engagement.destroy({
      where: { EngagementID: id }
    });

    if (!deleted) {
      return res.status(404).json({ error: "Engagement not found" });
    }

    res.status(200).json({ message: `Engagement with ID ${id} deleted` });
  } catch (error) {
    console.error("Error deleting engagement:", error);
    res.status(500).json({ error: "Failed to delete engagement" });
  }
};
