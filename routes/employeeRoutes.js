const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

router.get('/', auth(), employeeController.getAllEmployees);
router.post('/', auth(['HR']), employeeController.createEmployee);
router.get('/:id', auth(), employeeController.getEmployeeById);
router.put('/:id', auth(['HR']), employeeController.updateEmployee);
router.delete('/:id', auth(['HR']), employeeController.deleteEmployee);

module.exports = router;
