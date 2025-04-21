const { Employee } = require('../models');

// GET all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// CREATE a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { FullName, ContactInfo } = req.body;

    const newEmployee = await Employee.create({
      FullName,
      ContactInfo,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

// GET single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

// UPDATE employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { FullName, ContactInfo } = req.body;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await employee.update({ FullName, ContactInfo });

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// DELETE employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await employee.destroy();

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
