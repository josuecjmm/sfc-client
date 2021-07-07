const express = require('express');
const router = express.Router();

const userController = require('../controller/security/user.controller');
const validation = require('../utils/formValidations');
const isAuth = require('../middlewares/auth')


/* USER ROUTES =>*/
// POST /user
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = {
    routes: router,
};
