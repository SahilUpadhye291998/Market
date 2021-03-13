const {
    FileSystemWallet,
    Gateway,
    X509WalletMixin,
} = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org1.json");

async function registerCustomer(secretUserName, userOrg) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userExists = await wallet.exists(secretUserName);
        if (userExists) {
            console.log(
                `An identity for the user ${secretUserName} already exists in the wallet`
            );
            return;
        }
        const adminExists = await wallet.exists("adminOrg1");
        if (!adminExists) {
            console.log(
                'An identity for the admin user "adminOrg1" does not exist in the wallet'
            );
            console.log("Run the enrollAdmin.js application before retrying");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: "adminOrg1", //TODO: check if we can change this
            discovery: { enabled: true, asLocalhost: true },
        });
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        const secret = await ca.register(
            {
                enrollmentID: `${secretUserName}`,
                role: "client",
            },
            adminIdentity
        );
        const enrollment = await ca.enroll({
            enrollmentID: `${secretUserName}`,
            enrollmentSecret: secret,
        });

        const msp = userOrg.charAt(0).toUpperCase() + userOrg.slice(1) + "MSP";
        const userIdentity = X509WalletMixin.createIdentity(
            `${msp}`,
            enrollment.certificate,
            enrollment.key.toBytes()
        );

        await wallet.import(secretUserName, userIdentity);
        console.log(
            'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
        );
    } catch (error) {
        console.error(error);
        console.log("Some error has occured please contact web Master");
    }

}

async function initCustomer(
    secretUserName,
    name,
    email,
    mobileNumber,
    address
) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);

        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        await contract.submitTransaction(
            "initCustomer",
            name,
            email,
            mobileNumber,
            address
        );

        const json = {
            message: "Successfully Signed Up",
        };

        await gateway.disconnect();
        return json;
    } catch (error) {

        console.error(error);
        console.log("Some error has occured please contact web Master");
        throw new Error(error);
    }
}


async function addProductToCart(
    secretUserName,
    customerEmail,
    productname,
    productDesc,
    productType,
    productPrice,
    productQuantity) {

    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);

        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        await contract.submitTransaction(
            "addProductToCartByCustomer",
            customerEmail,
            productname,
            productDesc,
            productType,
            productPrice,
            productQuantity,
        );

        const json = {
            message: "Successfully Signed Up",
        };

        await gateway.disconnect();
        return json;
    } catch (error) {

        console.error(error);
        console.log("Some error has occured please contact web Master");
        throw new Error(error);
    }

}

async function addProductToWishList(
    secretUserName,
    customerEmail,
    productname,
    productDesc,
    productType,
    productPrice,
    productQuantity) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);

        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        await contract.submitTransaction(
            "addProductToWishListByCustomer",
            customerEmail,
            productname,
            productDesc,
            productType,
            productPrice,
            productQuantity,
        );

        const json = {
            message: "Successfully Signed Up",
        };

        await gateway.disconnect();
        return json;
    } catch (error) {

        console.error(error);
        console.log("Some error has occured please contact web Master");
        throw new Error(error);
    }
}

async function addProductToCheckout(
    secretUserName,
    customerEmail,
    productname,
    productDesc,
    productType,
    productPrice,
    productQuantity) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);

        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        await contract.submitTransaction(
            "addProductToCheckoutByCustomer",
            customerEmail,
            productname,
            productDesc,
            productType,
            productPrice,
            productQuantity,
        );

        const json = {
            message: "Successfully Signed Up",
        };

        await gateway.disconnect();
        return json;
    } catch (error) {

        console.error(error);
        console.log("Some error has occured please contact web Master");
        throw new Error(error);
    }
}
async function readCustomer(secretUserName, customerEmail) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);


        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        const result = await contract.evaluateTransaction(
            "readCustomer",
            customerEmail
        );
        return JSON.parse(result.toString());
    } catch (error) {
        console.log("Some error has occured please contact web Master");
    }

}

async function readProductCart(secretUserName, customerEmail) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);


        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        const result = await contract.evaluateTransaction(
            "readCustomerCart",
            customerEmail
        );
        return JSON.parse(result.toString());
    } catch (error) {
        console.log("Some error has occured please contact web Master");
    }
}

async function readProductWishList(secretUserName, customerEmail) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);


        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        const result = await contract.evaluateTransaction(
            "readCustomerWishList",
            customerEmail
        );
        return JSON.parse(result.toString());
    } catch (error) {
        console.log("Some error has occured please contact web Master");
    }
}

async function readProductCheckOut(secretUserName, customerEmail) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);


        const userExists = await wallet.exists(secretUserName);
        if (!userExists) {
            console.log("Please check this user does not exists");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: secretUserName,
            discovery: {
                enabled: true,
                asLocalhost: true,
            },
        });

        const network = await gateway.getNetwork("marketchannel");

        const contract = await network.getContract("market");

        const result = await contract.evaluateTransaction(
            "checkOutProduct",
            customerEmail
        );
        return JSON.parse(result.toString());
    } catch (error) {
        console.log("Some error has occured please contact web Master");
    }
}

module.exports = {
    registerCustomer,
    initCustomer,
    addProductToCart,
    addProductToWishList,
    addProductToCheckout,
    readCustomer,
    readProductCart,
    readProductWishList,
    readProductCheckOut,
};
