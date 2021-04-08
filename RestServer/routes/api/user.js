const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/signup', (req, res) => {
    console.log("OK Signup is called");
    const userToBeCreated = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "mobileNumber": req.body.mobileNumber,
        "secret": req.body.secret,
        "address": req.body.address,
        "isAuthenticated": true,
        "typeOf": req.body.typeOf,
    }
    const user = new User(userToBeCreated);
    user.save()
        .then((users) => {
            console.log(users)
            return res.status(200).json({ code: 200, users: users, message: "user created successfully" });
        })
        .catch((error) => {
            console.log(error)
            return res.status(500).send({ code: 500, users: error, message: "user not created successfully" });
        });
});

router.post('/login', (req, res) => {
    console.log("OK login is called");
    const email = req.body.email;
    const password = req.body.password;
    User.find({ email: email, password: password })
        .then((users) => {
            console.log(users)
            return res.status(200).json({ code: 200, users: users });
        })
        .catch((error) => {
            return res.status(500).send({ code: 500, users: "Please check the username and password" });
        });
});

router.get('/getSupplier', (req, res) => {
    console.log("OK Supplier is called");
    User.find({ typeOf: 'supplier' }).sort({ date: -1 })
        .then((users) => {
            return res.status(200).json({ code: 200, users: users });
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(404)
                .json({ code: 404, message: `Please contact the admin` });
        });
});

router.get('/getCustomer', (req, res) => {
    console.log("OK Supplier is called");
    User.find({ typeOf: 'customer' }).sort({ date: -1 })
        .then((users) => {
            return res.status(200).json({ code: 200, users: users });
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(404)
                .json({ code: 404, message: `Please contact the admin` });
        });
});

router.get('/getSupplier/:supplierEmail', (req, res) => {
    console.log("OK Supplier is called");
    User.find({ email: req.params.supplierEmail, typeOf: 'supplier' }).sort({ date: -1 })
        .then((users) => {
            return res.status(200).json({ code: 200, users: users });
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(404)
                .json({ code: 404, message: `Please contact the admin` });
        });
});

router.get('/getCustomer/:supplierCustomer', (req, res) => {
    console.log("OK Supplier is called");
    User.find({ email: req.params.supplierCustomer, typeOf: 'customer' }).sort({ date: -1 })
        .then((users) => {
            return res.status(200).json({ code: 200, users: users });
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(404)
                .json({ code: 404, message: `Please contact the admin` });
        });
});

module.exports = router;