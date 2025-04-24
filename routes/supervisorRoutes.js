const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController.js');
const auth = require('../middleware/auth');

router.get('/', auth(), supervisorController.getAllSupervisors);
router.post('/', auth(['HR']), supervisorController.createSupervisor);
router.get('/:id', auth(), supervisorController.getSupervisorById);
router.put('/:id', auth(['HR']), supervisorController.updateSupervisor);
router.delete('/:id', auth(['HR']), supervisorController.deleteSupervisor);
router.get('/sup/:supervisorId',auth(['Supervisor']), supervisorController.getAllEngagementsBySupervisorId);

module.exports = router;
