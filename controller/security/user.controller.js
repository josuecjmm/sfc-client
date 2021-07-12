const User = require('../../models/user.model');
const html = require('../../constants/html/index');
const date = require('../../utils/date')
const validation = require('../../utils/formValidations');
const mailer = require('../../utils/mailer');
const crypto = require('../../utils/crypto')

exports.login = async (req, res, next) => {
    const {personalId, password} = req.body;

    let users = await User.fetchByPersonalId(personalId);
    users = JSON.parse(users);

    if (users.length === 0) {
        req.flash('error', 'Usuario o Contraseña invalido')
        res.redirect('/login')
    } else {
        const userPassword = crypto.decrypt(users[0].password);
        if (userPassword === password) {
            req.session.isLoggedIn = true;
            req.session.userId = users[0].id;
            req.session.name = users[0].fullName;
            res.redirect('/home')
        } else {
            req.flash('error', 'Usuario o Contraseña invalido')
            res.redirect('/login')
        }
    }
};

exports.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/home')
    })
};
