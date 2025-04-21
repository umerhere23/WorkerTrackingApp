const express = require('express');
const router = express.Router();
const jobTitleController = require('../controllers/jobTitleController.js');
const auth = require('../middleware/auth');

router.get('/jobs', auth(), jobTitleController.getAllJobTitles);
router.post('/', auth(['HR']), jobTitleController.createJobTitle);
router.get('/:id', auth(), jobTitleController.getJobTitleById);
router.put('/:id', auth(['HR']), jobTitleController.updateJobTitle);
router.delete('/:id', auth(['HR']), jobTitleController.deleteJobTitle);

module.exports = router;
