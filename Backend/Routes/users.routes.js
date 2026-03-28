const express = require('express');
//importamos modulos de router y conrollers
const router = express.Router();
const usersController = require('../Controllers/users.controller');

//ruta para obtener todos los usuarios
router.get('/', usersController.getAllUsers);

//ruta para obtener un usuario por id
router.get('/:id', usersController.getUserById);

//ruta para actualizar el email de un usuario
router.put('/:id', usersController.updateUserEmail);

//ruta para eliminar un usuario
router.delete('/:id', usersController.deleteUser);

//exportamos el router
module.exports = router;