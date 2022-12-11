const express = require('express');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT;
const connection = require('./config/db');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

const authenticator = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, 'hush', function (err, decoded) {
        if (decoded) {
            next();
        } else if (err) {
            res.send('Please login!');
        }
    })
};

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/products', authenticator, productRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage');
});

app.listen(PORT, async (req, res) => {
    try {
        await connection;
        console.log('Connected to DB');
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Listening at ${PORT}`);
});

