const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/users.model');

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    const userPresent = await UserModel.findOne({ email });
    if (userPresent?.email) {
        res.send({ "msg": "user is already present" });
    } else {

        try {
            bcrypt.hash(password, 8, async function (err, hash) {
                const user = await UserModel.create({ name, email, password: hash });
                res.send({ "msg": "user has been created" });
            })
        }
        catch (err) {
            console.log(err);
            res.send('Something went wrong');
        }

    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user?.email) {
            const hashed_password = user.password;

            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), auth: 'login' }, 'hush');
                    res.send({ "msg": "user logged in", "token": token });
                }
                else {
                    res.send({ "err": "Wrong password" });
                }
            })

        } else {
            res.send({ "err": "User not found" });
        }

    }
    catch (err) {
        console.log(err);
        res.send({ "err": "something went wrong" });
    }
});

module.exports = userRoute;