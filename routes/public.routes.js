const express = require('express');
const router = express.Router();

const publicController = require('../controller/public.controller');
const appointmentController = require('../controller/appointment/appointment.controller');
const isAuth = require('../middlewares/auth')

// GET /error
router.get('/home', isAuth, appointmentController.getAppointmentDays);
router.get('/error', publicController.getError);

module.exports = {
    routes: router,
};
