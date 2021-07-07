require('dotenv').config();
const crypto = require('./utils/crypto')

const encrypted = crypto.encrypt('admin')

encrypted;