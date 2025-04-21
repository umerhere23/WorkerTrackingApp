const { Department } = require('../models');

// GET all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

// CREATE a new department
exports.createDepartment = async (req, res) => {
  try {
    const { DepartmentName } = req.body;

    const existing = await Department.findOne({ where: { DepartmentName } });
    if (existing) {
      return res.status(400).json({ error: "Department already exists" });
    }

    const newDepartment = await Department.create({ DepartmentName });
    res.status(201).json({
      message: "Department created successfully",
      department: newDepartment
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
};

// GET department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ error: "Failed to fetch department" });
  }
};

// UPDATE department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { DepartmentName } = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    await department.update({ DepartmentName });
    res.status(200).json({ message: "Department updated successfully", department });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Failed to update department" });
  }
};

// DELETE department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    await department.destroy();
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Failed to delete department" });
  }
};
