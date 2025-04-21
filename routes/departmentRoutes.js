const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController.js');
const auth = require('../middleware/auth.js');

router.get('/', auth(), departmentController.getAllDepartments);
router.post('/', auth(['HR']), departmentController.createDepartment);
router.get('/:id', auth(), departmentController.getDepartmentById);
router.put('/:id', auth(['HR']), departmentController.updateDepartment);
router.delete('/:id', auth(['HR']), departmentController.deleteDepartment);

module.exports = router;
