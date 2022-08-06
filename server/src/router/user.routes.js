const express = require('express');
const routes = express();
const { register, login, logout, updateUser, findUserById } = require('../controllers/user.controller');

routes.route('').get(findUserById).post(register).put(updateUser).delete(logout);

routes.post('/login', login);

module.exports = routes;
