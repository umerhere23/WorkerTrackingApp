const express = require('express');
const router = express.Router();
const engagementController = require('../controllers/engagementController');
const auth = require('../middleware/auth');

router.get('/', auth(['HR', 'Supervisor', 'Manager']), engagementController.getAllEngagements);
router.post('/', auth(['HR']), engagementController.createEngagement);
router.get('/:id', auth(), engagementController.getEngagementById);
router.put('/:id', auth(['HR']), engagementController.updateEngagement);
router.delete('/:id', auth(['HR']), engagementController.deleteEngagement);

module.exports = router;
