const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

const connection = mongoose.connect(process.env.DB_URL);

module.exports = connection;