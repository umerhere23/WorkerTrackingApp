const { JobTitle, Department } = require('../models');

// GET all job titles
exports.getAllJobTitles = async (req, res) => {
  try {
    const jobTitles = await JobTitle.findAll({
      include: [{ model: Department }]
    });
    res.status(200).json(jobTitles);
  } catch (error) {
    console.error("Error fetching job titles:", error);
    res.status(500).json({ error: "Failed to fetch job titles" });
  }
};

// CREATE a new job title
exports.createJobTitle = async (req, res) => {
  try {
    const { Title, DepartmentID } = req.body;

    const newJobTitle = await JobTitle.create({ Title, DepartmentID });
    res.status(201).json({
      message: "Job title created successfully",
      jobTitle: newJobTitle
    });
  } catch (error) {
    console.error("Error creating job title:", error);
    res.status(500).json({ error: "Failed to create job title" });
  }
};

// GET a single job title by ID
exports.getJobTitleById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobTitle = await JobTitle.findByPk(id, {
      include: [{ model: Department }]
    });

    if (!jobTitle) {
      return res.status(404).json({ error: "Job title not found" });
    }

    res.status(200).json(jobTitle);
  } catch (error) {
    console.error("Error fetching job title:", error);
    res.status(500).json({ error: "Failed to fetch job title" });
  }
};

// UPDATE a job title by ID
exports.updateJobTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, DepartmentID } = req.body;

    const jobTitle = await JobTitle.findByPk(id);
    if (!jobTitle) {
      return res.status(404).json({ error: "Job title not found" });
    }

    await jobTitle.update({ Title, DepartmentID });
    res.status(200).json({ message: "Job title updated successfully", jobTitle });
  } catch (error) {
    console.error("Error updating job title:", error);
    res.status(500).json({ error: "Failed to update job title" });
  }
};

// DELETE a job title by ID
exports.deleteJobTitle = async (req, res) => {
  try {
    const { id } = req.params;

    const jobTitle = await JobTitle.findByPk(id);
    if (!jobTitle) {
      return res.status(404).json({ error: "Job title not found" });
    }

    await jobTitle.destroy();
    res.status(200).json({ message: "Job title deleted successfully" });
  } catch (error) {
    console.error("Error deleting job title:", error);
    res.status(500).json({ error: "Failed to delete job title" });
  }
};
