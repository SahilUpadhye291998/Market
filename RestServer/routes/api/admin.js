const express = require('express');
const router = express.Router();

const admin = require('../../methods/admin');

router.get('/', async (req, res) => {
    console.log("OK");
    let json = {};
    await admin
        .enrollSupplier()
        .then(() => {
            json.code = 200;
            json.supplierMessage = "Supplier Admin enrolled successfully";
            console.log("Supplier is issued");
        })
        .catch((error) => {
            console.log(error);
            json.code = 500;
            json.message = "Some error has occured";
            return res.status(500).send(json);
        });
    await admin
        .enrollCustomer()
        .then(() => {
            json.code = 200;
            json.customerMessage = "customer Admin enrolled successfully";
            console.log("customer is issued");
        })
        .catch((error) => {
            console.log(error);
            json.code = 500;
            json.message = "Some error has occured";
            return res.status(500).send(json);
        });
    return res.status(200).send(json);

})

module.exports = router;