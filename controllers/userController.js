const { User } = require('../models');
const bcrypt = require('bcrypt');

 exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['UserID', 'FullName', 'Role', 'Email', 'PasswordHash', 'createdAt']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// POST create user (HR only)
exports.createUser = async (req, res) => {
  try {
    const { FullName, Role, Email, Password } = req.body;

    if (!FullName || !Role || !Email || !Password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    const PasswordHash = await bcrypt.hash(Password, 10);

    const newUser = await User.create({
      FullName,
      Role,
      Email,
      PasswordHash
    });

    const { PasswordHash: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['PasswordHash'] }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
 
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// PUT update user by ID (HR only)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { FullName, Role, Email, Password } = req.body;

    const updateData = { FullName, Role, Email };
    if (Password) {
      updateData.PasswordHash = await bcrypt.hash(Password, 10);
    }

    const [updated] = await User.update(updateData, {
      where: { UserID: id }
    });

    if (!updated) {
      return res.status(404).json({ error: "User not found or nothing changed" });
    }

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['PasswordHash'] }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// DELETE user by ID (HR only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { UserID: id }
    });

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: `User with ID ${id} deleted` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
