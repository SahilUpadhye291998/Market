"use strict";
const shim = require("fabric-shim");
const util = require("util");

let ChainCode = class {
    async Init(stub) {
        const ret = stub.getFunctionAndParameters();
        console.info(ret);
        console.info("Sample Chaincode is initalized");
        return shim.success();
    }
    async Invoke(stub) {
        console.info(`Transaction ID is ${stub.getTxID()}`);
        console.info(util.format(`Args ${stub.getArgs()}`));
        const ret = stub.getFunctionAndParameters();
        console.info(ret);
        const method = this[ret.fcn];
        if (!method) {
            console.info(`Received unknow ${ret.fcn} invocation`);
            throw new Error(`Received unknow ${ret.fcn} invocation`);
        }
        try {
            let payload = await method(stub, ret.params, this);
            return shim.success(payload);
        } catch (error) {
            console.log(error);
            return shim.error(error);
        }
    }

    async initCustomer(stub, args, thisClass) {
        console.log("----------START OF INIT customer------------");
        console.log(`args length : ${args.length}`);
        if (args.length != 4) {
            throw new Error(
                `Invalid number of args. Please check the number of args`
            );
        }
        const name = args[0];
        const email = args[1];
        const mobileNumber = args[2];
        const address = args[3];
        let customerState = await stub.getState(email);
        if (customerState.toString()) {
            throw new Error(`This user already exist`);
        }
        let customer = {};
        customer.docType = "customer";
        customer.id = email;
        customer.name = name;
        customer.email = email;
        customer.mobileNumber = mobileNumber;
        customer.address = address;
        customer.wishlist = [];
        customer.cart = [];
        customer.checkOutProduct = [];

        console.log(customer);
        await stub.putState(customer.id, Buffer.from(JSON.stringify(customer)));

        const indexName = `email`;
        let secretNameIndexKey = await stub.createCompositeKey(indexName, [
            customer.email,
        ]);
        await stub.putState(secretNameIndexKey, Buffer.from("\u0000"));
        console.log("-------------END OF INIT customer------------");
    }
    async initSupplier(stub, args, thisClass) {
        console.log("----------START OF INIT supplier------------");
        console.log(`args length : ${args.length}`);
        if (args.length != 4) {
            throw new Error(
                `Invalid number of args. Please check the number of args`
            );
        }
        const name = args[0];
        const email = args[1];
        const mobileNumber = args[2];
        const address = args[3];
        let supplierState = await stub.getState(email);
        if (supplierState.toString()) {
            throw new Error(`This user already exist`);
        }
        let supplier = {};
        supplier.docType = "supplier";
        supplier.id = email;
        supplier.name = name;
        supplier.email = email;
        supplier.mobileNumber = mobileNumber;
        supplier.address = address;
        supplier.products = [];

        console.log(supplier);
        await stub.putState(supplier.id, Buffer.from(JSON.stringify(supplier)));

        const indexName = `email`;
        let secretNameIndexKey = await stub.createCompositeKey(indexName, [
            supplier.email,
        ]);
        await stub.putState(secretNameIndexKey, Buffer.from("\u0000"));
        console.log("-------------END OF INIT supplier------------");
    }

    async readCustomer(stub, args, thisClass) {
        if (args.length != 1) {
            throw new Error(
                "Incorrect number of arguments. Expecting name of the marble to query"
            );
        }

        let argUser = args[0];
        if (!argUser) {
            throw new Error(`Name cant be blank`);
        }

        let customer = await stub.getState(argUser);
        if (!customer) {
            let jsonResponce = {};
            jsonResponce.Error = `Unable to find customer with given phone number`;
            throw new Error(JSON.stringify(jsonResponce));
        }

        console.log(
            "====================================================================="
        );
        console.log(customer.toString());
        console.log(
            "====================================================================="
        );
        return customer;
    }
    async readSupplier(stub, args, thisClass) {
        if (args.length != 1) {
            throw new Error(
                "Incorrect number of arguments. Expecting name of the marble to query"
            );
        }

        let argUser = args[0];
        if (!argUser) {
            throw new Error(`Name cant be blank`);
        }

        let supplier = await stub.getState(argUser);
        if (!supplier) {
            let jsonResponce = {};
            jsonResponce.Error = `Unable to find supplier with given phone number`;
            throw new Error(JSON.stringify(jsonResponce));
        }

        console.log(
            "====================================================================="
        );
        console.log(supplier.toString());
        console.log(
            "====================================================================="
        );
        return supplier;
    }

    async addProductBySupplier(stub, args, thisClass) {
        if (args.length < 6) {
            throw new Error("Incorrect number of arguments");
        }
        let supplierID = args[0];
        let supplierAsBytes = await stub.getState(supplierID);
        if (!supplierAsBytes.toString()) {
            throw new Error(`farmer is not found`);
        }
        let supplier = {};
        try {
            supplier = JSON.parse(supplierAsBytes.toString());
        } catch (error) {
            let jsonError = {};
            jsonError.Error = `Unable to decode json of ${args[0]}`;
            throw new Error(JSON.stringify(jsonError));
        }

        const product = {
            "productname": args[1],
            "productDesc": args[2],
            "productType": args[3],
            "productPrice": args[4],
            "productQuantity": args[5],
        }
        try {
            supplier.products.push(product);
        } catch (error) {
            throw new Error(`${error}`);
        }

        await stub.putState(supplierID, Buffer.from(JSON.stringify(supplier)));
    }
    async addProductToCartByCustomer(stub, args, thisClass) {
        if (args.length < 6) {
            throw new Error("Incorrect number of arguments");
        }
        let customerID = args[0];
        let customerAsBytes = await stub.getState(customerID);
        if (!customerAsBytes.toString()) {
            throw new Error(`farmer is not found`);
        }
        let customer = {};
        try {
            customer = JSON.parse(customerAsBytes.toString());
        } catch (error) {
            let jsonError = {};
            jsonError.Error = `Unable to decode json of ${args[0]}`;
            throw new Error(JSON.stringify(jsonError));
        }

        const product = {
            "productname": args[1],
            "productDesc": args[2],
            "productType": args[3],
            "productPrice": args[4],
            "productQuantity": 0,
        }

        customer.cart.push(product);

        let cart = [];

        if (customer.cart.length == 0) {
            cart.push(product);
        } else {
            const map = new Map();
            for (const item of customer.cart) {
                if (!map.has(item.productname)) {
                    map.set(item.productname, true);    // set any value to Map
                    cart.push({
                        productname: item.productname,
                        productDesc: item.productDesc,
                        productType: item.productType,
                        productPrice: item.productPrice,
                        productQuantity: item.productQuantity,
                    });
                }
            }
        }

        console.log(cart)

        cart = cart.map((data) => {
            if (data.productname === args[1]) {
                let temp = parseInt(data.productQuantity)
                let input = parseInt(args[5])
                data.productQuantity = input + temp;
                console.log(`temp: ${temp}`);
                console.log(`data Product: ${data.productQuantity}`);

            }
            return data;
        })

        try {
            customer.cart = cart;
        } catch (error) {
            throw new Error(`${error}`);
        }

        await stub.putState(customerID, Buffer.from(JSON.stringify(customer)));
    }
    async addProductToWishListByCustomer(stub, args, thisClass) {
        if (args.length < 6) {
            throw new Error("Incorrect number of arguments");
        }
        let customerID = args[0];
        let customerAsBytes = await stub.getState(customerID);
        if (!customerAsBytes.toString()) {
            throw new Error(`farmer is not found`);
        }
        let customer = {};
        try {
            customer = JSON.parse(customerAsBytes.toString());
        } catch (error) {
            let jsonError = {};
            jsonError.Error = `Unable to decode json of ${args[0]}`;
            throw new Error(JSON.stringify(jsonError));
        }

        const product = {
            "productname": args[1],
            "productDesc": args[2],
            "productType": args[3],
            "productPrice": args[4],
            "productQuantity": 0,
        }

        customer.wishlist.push(product);

        let wishlist = [];

        if (customer.wishlist.length == 0) {
            wishlist.push(product);
        } else {
            const map = new Map();
            for (const item of customer.wishlist) {
                if (!map.has(item.productname)) {
                    map.set(item.productname, true);    // set any value to Map
                    wishlist.push({
                        productname: item.productname,
                        productDesc: item.productDesc,
                        productType: item.productType,
                        productPrice: item.productPrice,
                        productQuantity: item.productQuantity,
                    });
                }
            }
        }

        console.log(wishlist)

        wishlist = wishlist.map((data) => {
            if (data.productname === args[1]) {
                let temp = parseInt(data.productQuantity)
                let input = parseInt(args[5])
                data.productQuantity = input + temp;
                console.log(`temp: ${temp}`);
                console.log(`data Product: ${data.productQuantity}`);

            }
            return data;
        })

        try {
            // customer.wishlist.push(product);
            customer.wishlist = wishlist;
        } catch (error) {
            throw new Error(`${error}`);
        }

        await stub.putState(customerID, Buffer.from(JSON.stringify(customer)));
    }
    async addProductToCheckoutByCustomer(stub, args, thisClass) {
        if (args.length < 1) {
            throw new Error("Incorrect number of arguments");
        }
        let customerID = args[0];
        let customerAsBytes = await stub.getState(customerID);
        if (!customerAsBytes.toString()) {
            throw new Error(`farmer is not found`);
        }
        let customer = {};
        try {
            customer = JSON.parse(customerAsBytes.toString());
        } catch (error) {
            let jsonError = {};
            jsonError.Error = `Unable to decode json of ${args[0]}`;
            throw new Error(JSON.stringify(jsonError));
        }

        const product = {
            "productname": args[1],
            "productDesc": args[2],
            "productType": args[3],
            "productPrice": args[4],
            "productQuantity": args[5],
        }
        const cart = customer.cart.filter(data => data.productname !== args[1])
        console.log(`CART: ${cart}`);
        console.log(`CUSTOMER: ${customer.checkout}`);
        try {
            customer.checkOutProduct.push(product);
            customer.cart = cart;
        } catch (error) {
            throw new Error(`${error}`);
        }

        await stub.putState(customerID, Buffer.from(JSON.stringify(customer)));
    }

    async readCustomerWishList(stub, args, thisClass) {
        if (args.length != 1) {
            throw new Error(
                "Incorrect number of arguments. Expecting name of the marble to query"
            );
        }

        let argUser = args[0];
        if (!argUser) {
            throw new Error(`Name cant be blank`);
        }

        let customer = await stub.getState(argUser);
        if (!customer) {
            let jsonResponce = {};
            jsonResponce.Error = `Unable to find customer with given phone number`;
            throw new Error(JSON.stringify(jsonResponce));
        }

        console.log(
            "====================================================================="
        );
        console.log(customer.toString());
        console.log(
            "====================================================================="
        );
        const customerWishList = JSON.parse(customer);
        return Buffer.from(JSON.stringify(customerWishList.wishlist));
    }
    async readCustomerCart(stub, args, thisClass) {
        if (args.length != 1) {
            throw new Error(
                "Incorrect number of arguments. Expecting name of the marble to query"
            );
        }

        let argUser = args[0];
        if (!argUser) {
            throw new Error(`Name cant be blank`);
        }

        let customer = await stub.getState(argUser);
        if (!customer) {
            let jsonResponce = {};
            jsonResponce.Error = `Unable to find customer with given phone number`;
            throw new Error(JSON.stringify(jsonResponce));
        }

        console.log(
            "====================================================================="
        );
        console.log(customer.toString());
        console.log(
            "====================================================================="
        );
        const customerCart = JSON.parse(customer);
        return Buffer.from(JSON.stringify(customerCart.cart));

    }
    async checkOutProduct(stub, args, thisClass) {
        if (args.length != 1) {
            throw new Error(
                "Incorrect number of arguments. Expecting name of the marble to query"
            );
        }

        let argUser = args[0];
        if (!argUser) {
            throw new Error(`Name cant be blank`);
        }

        let customer = await stub.getState(argUser);
        if (!customer) {
            let jsonResponce = {};
            jsonResponce.Error = `Unable to find customer with given phone number`;
            throw new Error(JSON.stringify(jsonResponce));
        }

        console.log(
            "====================================================================="
        );
        console.log(customer.toString());
        console.log(
            "====================================================================="
        );

        const customerCheckOutProduct = JSON.parse(customer);
        return Buffer.from(JSON.stringify(customerCheckOutProduct.checkOutProduct));
    }
    async readSupplierProduct(stub, args, thisClass) {
        if (args.length != 1) {
            throw new Error(
                "Incorrect number of arguments. Expecting name of the marble to query"
            );
        }

        let argUser = args[0];
        if (!argUser) {
            throw new Error(`Name cant be blank`);
        }

        let supplier = await stub.getState(argUser);
        if (!supplier) {
            let jsonResponce = {};
            jsonResponce.Error = `Unable to find supplier with given phone number`;
            throw new Error(JSON.stringify(jsonResponce));
        }

        console.log(
            "====================================================================="
        );
        console.log(supplier.toString());
        console.log(
            "====================================================================="
        );
        const supplierProduct = JSON.parse(supplier);
        return Buffer.from(JSON.stringify(supplierProduct.products));
    }

    async readCustomerHistory(stub, args, thisClass) {
        if (args.length < 1) {
            throw new Error("Incorrect number of arguments. Expecting 1");
        }
        let customerID = args[0];
        console.info("- start getHistoryForMarble: %s\n", customerID);

        let resultsIterator = await stub.getHistoryForKey(customerID);
        let method = thisClass["getAllResults"];
        let results = await method(resultsIterator, true);

        return Buffer.from(JSON.stringify(results));
    }
    async readSupplierHistory(stub, args, thisClass) {
        if (args.length < 1) {
            throw new Error("Incorrect number of arguments. Expecting 1");
        }
        let supplierID = args[0];
        console.info("- start getHistoryForMarble: %s\n", supplierID);

        let resultsIterator = await stub.getHistoryForKey(supplierID);
        let method = thisClass["getAllResults"];
        let results = await method(resultsIterator, true);

        return Buffer.from(JSON.stringify(results));
    }

    async getQueryResultForQueryString(stub, queryString, thisClass) {
        console.info("- getQueryResultForQueryString queryString:\n" + queryString);
        let resultsIterator = await stub.getQueryResult(queryString);
        let method = thisClass["getAllResults"];

        let results = await method(resultsIterator, false);

        return Buffer.from(JSON.stringify(results));
    }
    async getAllResults(iterator, isHistory) {
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString("utf8"));

                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString("utf8");
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString("utf8");
                    }
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log("end of data");
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }

}

shim.start(new ChainCode())