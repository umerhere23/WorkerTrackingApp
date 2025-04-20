const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth(['HR']), userController.getAllUsers);
router.post('/', auth(['HR']), userController.createUser);
router.get('/:id', auth(), userController.getUserById);
router.put('/:id', auth(['HR']), userController.updateUser);
router.delete('/:id', auth(['HR']), userController.deleteUser);

module.exports = router;
