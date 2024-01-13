const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Get all users
router.get('/users', userController.getAllUsers);

// Get a specific user by ID
router.get('/users/:id', userController.getUserById);

// Create a new user
router.post('/users', userController.createUser);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

router.get('/users/email/:email', userController.getUserByEmail);


// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
