 const { Engagement, Employee, Department, JobTitle, Supervisor } = require('../models');

// GET all supervisors
exports.getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.findAll({
      include: [{ model: Department }]
    });
    res.status(200).json(supervisors);
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    res.status(500).json({ error: "Failed to fetch supervisors" });
  }
};

// CREATE a new supervisor
exports.createSupervisor = async (req, res) => {
  try {
    const { FullName, Email, DepartmentID } = req.body;

    const newSupervisor = await Supervisor.create({ FullName, Email, DepartmentID });
    res.status(201).json({
      message: "Supervisor created successfully",
      supervisor: newSupervisor
    });
  } catch (error) {
    console.error("Error creating supervisor:", error);
    res.status(500).json({ error: "Failed to create supervisor" });
  }
};

// GET a single supervisor by ID
exports.getSupervisorById = async (req, res) => {
  try {
    const { id } = req.params;
    const supervisor = await Supervisor.findByPk(id, {
      include: [{ model: Department }]
    });

    if (!supervisor) {
      return res.status(404).json({ error: "Supervisor not found" });
    }

    res.status(200).json(supervisor);
  } catch (error) {
    console.error("Error fetching supervisor:", error);
    res.status(500).json({ error: "Failed to fetch supervisor" });
  }
};

// UPDATE a supervisor by ID
exports.updateSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { FullName, Email, DepartmentID } = req.body;

    const supervisor = await Supervisor.findByPk(id);
    if (!supervisor) {
      return res.status(404).json({ error: "Supervisor not found" });
    }

    await supervisor.update({ FullName, Email, DepartmentID });
    res.status(200).json({ message: "Supervisor updated successfully", supervisor });
  } catch (error) {
    console.error("Error updating supervisor:", error);
    res.status(500).json({ error: "Failed to update supervisor" });
  }
};

// DELETE a supervisor by ID
exports.deleteSupervisor = async (req, res) => {
  try {
    const { id } = req.params;

    const supervisor = await Supervisor.findByPk(id);
    if (!supervisor) {
      return res.status(404).json({ error: "Supervisor not found" });
    }

    await supervisor.destroy();
    res.status(200).json({ message: "Supervisor deleted successfully" });
  } catch (error) {
    console.error("Error deleting supervisor:", error);
    res.status(500).json({ error: "Failed to delete supervisor" });
  }
};
exports.getAllEngagementsBySupervisorId = async (req, res) => {
  try {
    const { supervisorId } = req.params;
    console.log("Supervisor ID from params:", supervisorId);

    const engagements = await Engagement.findAll({
      where: { SupervisorID: supervisorId },
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
    console.error("Error fetching engagements by supervisor ID:", error);
    res.status(500).json({ error: "Failed to fetch engagements" });
  }
};



