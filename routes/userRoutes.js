const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController.js');

router
.route(`/`)
.get(userController.getallUsers)
.post(userController.createUser);

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;
