const express = require('express');
const router = express.Router();

const supplier = require('../../methods/supplier');


router.post('/register', (req, res) => {
	console.log("OK Register is called");
	const secretUserName = req.body.secretUserName;
	const userOrg = req.body.userOrg;
	supplier.registerSupplier(secretUserName, userOrg)
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

	console.log(req.body)

	supplier.initSupplier(secretUserName, name, email, mobileNumber, address)
		.then((result) => { return res.status(200).json({ status: 200, result: result }) })
		.catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/readSupplier', (req, res) => {
	console.log("OK Supplier is called");
	const secretUserName = req.body.secretUserName;
	const email = req.body.email;

	console.log(req.body)

	supplier.readSupplier(secretUserName, email)
		.then((result) => { return res.status(200).json({ status: 200, result: result }) })
		.catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/addProductBySupplier', (req, res) => {
	console.log("OK Add product is called");
	const secretUserName = req.body.secretUserName;
	const supplierEmail = req.body.supplierEmail;
	const productName = req.body.productName;
	const productDesc = req.body.productDesc;
	const productType = req.body.productType;
	const productPrice = req.body.productPrice;
	const productQuantity = req.body.productQuantity;

	console.log(req.body)

	supplier.addProductToSupplier(secretUserName, supplierEmail, productName, productDesc, productType, productPrice, productQuantity)
		.then((result) => { return res.status(200).json({ status: 200, result: result }) })
		.catch(error => { return res.status(500).json({ status: 500, result: error }) });
});

router.post('/readSupplierProduct', (req, res) => {
	console.log("OK Read the supplier product");
	const secretUserName = req.body.secretUserName;
	const email = req.body.email;

	supplier.readSupplierProduct(secretUserName, email)
		.then((result) => { return res.status(200).json({ status: 200, result: result }) })
		.catch(error => { return res.status(500).json({ status: 500, result: error }) });
});
module.exports = router;