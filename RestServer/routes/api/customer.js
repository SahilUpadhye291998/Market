const express = require('express');
const router = express.Router();

const customer = require('../../methods/customer');

router.post('/register', (req, res) => {
    console.log("OK Register is called");
    const secretUserName = req.body.secretUserName;
    const userOrg = req.body.userOrg;
    customer.registerCustomer(secretUserName, userOrg)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/signup', (req, res) => {
    console.log("OK Signup is called");
    const secretUserName = req.body.secretUserName;
    const email = req.body.email;
    const name = req.body.name;
    const mobileNumber = req.body.mobileNumber;
    const address = req.body.address;

    customer.initCustomer(secretUserName, name, email, mobileNumber, address)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/readCustomer', (req, res) => {
    console.log("OK Customer is called");
    const secretUserName = req.body.secretUserName;
    const email = req.body.email;

    customer.readCustomer(secretUserName, email)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/addProductToCart', (req, res) => {
    console.log("OK Add product is called");
    const secretUserName = req.body.secretUserName;
    const customerEmail = req.body.customerEmail;
    const productName = req.body.productname;
    const productDesc = req.body.productDesc;
    const productType = req.body.productType;
    const productPrice = req.body.productPrice;
    const productQuantity = req.body.productQuantity;

    customer.addProductToCart(secretUserName, customerEmail, productName, productDesc, productType, productPrice, productQuantity)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});
router.post('/readProductCart', (req, res) => {
    console.log("OK Read from the cart will be placed here");
    const secretUserName = req.body.secretUserName;
    const email = req.body.email;

    customer.readProductCart(secretUserName, email)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/addProductToWishList', (req, res) => {
    console.log("OK Add Product to the wishlist");
    const secretUserName = req.body.secretUserName;
    const customerEmail = req.body.customerEmail;
    const productName = req.body.productname;
    const productDesc = req.body.productDesc;
    const productType = req.body.productType;
    const productPrice = req.body.productPrice;
    const productQuantity = req.body.productQuantity;

    customer.addProductToWishList(secretUserName, customerEmail, productName, productDesc, productType, productPrice, productQuantity)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/readProductWishList', (req, res) => {
    console.log("OK Read Product to the wish list");

    const secretUserName = req.body.secretUserName;
    const email = req.body.email;

    customer.readProductWishList(secretUserName, email)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/addProductToCheckout', (req, res) => {
    console.log("OK add product to checkout");
    const secretUserName = req.body.secretUserName;
    const customerEmail = req.body.customerEmail;
    const productName = req.body.productname;
    const productDesc = req.body.productDesc;
    const productType = req.body.productType;
    const productPrice = req.body.productPrice;
    const productQuantity = req.body.productQuantity.toString();

    console.log(req.body)

    customer.addProductToCheckout(secretUserName, customerEmail, productName, productDesc, productType, productPrice, productQuantity)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/readProductCheckOut', (req, res) => {
    console.log("OK read product from checkout");
    const secretUserName = req.body.secretUserName;
    const email = req.body.email;

    customer.readProductCheckOut(secretUserName, email)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/readProductCheckOut', (req, res) => {
    console.log("OK read product from checkout");
    const secretUserName = req.body.secretUserName;
    const email = req.body.email;

    customer.readProductCheckOut(secretUserName, email)
        .then((result) => { return res.status(200).json({ status: 200, result: result }) })
        .catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

module.exports = router;
