const {
    FileSystemWallet,
    Gateway,
    X509WalletMixin,
} = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org2.json");

async function registerSupplier(secretSupplierName, companyOrg) {
    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        console.log(secretSupplierName)
        console.log(companyOrg)

        const userExists = await wallet.exists(secretSupplierName);
        if (userExists) {
            console.log(
                'An identity for the user "user1" already exists in the wallet'
            );
            return;
        }
        const adminExists = await wallet.exists("adminOrg2");
        if (!adminExists) {
            console.log(
                'An identity for the admin user "adminOrg2" does not exist in the wallet'
            );
            console.log("Run the enrollAdmin.js application before retrying");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: "adminOrg2", //TODO: check if we can change this
            discovery: { enabled: true, asLocalhost: false },
        });
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        const secret = await ca.register(
            {
                enrollmentID: `${secretSupplierName}`,
                role: "client",
            },
            adminIdentity
        );
        const enrollment = await ca.enroll({
            enrollmentID: `${secretSupplierName}`,
            enrollmentSecret: secret,
        });

        const msp =
            companyOrg.charAt(0).toUpperCase() + companyOrg.slice(1) + "MSP";
        const userIdentity = X509WalletMixin.createIdentity(
            `${msp}`,
            enrollment.certificate,
            enrollment.key.toBytes()
        );

        await wallet.import(secretSupplierName, userIdentity);
        console.log(
            'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
        );
    } catch (error) {
        console.error(error);
        console.log("Some error has occured please contact web Master");
    }
}


async function initSupplier(
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
        console.log(secretUserName);
        console.log(name);

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
            "initSupplier",
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

async function addProductToSupplier(
    secretUserName,
    supplierEmail,
    productname,
    productDesc,
    productType,
    productPrice,
    productQuantity) {

    try {
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = new FileSystemWallet(walletPath);
        console.log(walletPath);
        console.log(supplierEmail)
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
            "addProductBySupplier",
            supplierEmail,
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

async function readSupplier(secretUserName, supplierEmail) {
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
            "readSupplier",
            supplierEmail
        );
        console.log();
        return JSON.parse(result.toString());
    } catch (error) {
        console.log(error)
        console.log("Some error has occured please contact web Master");
    }
}

async function readSupplierProduct(secretUserName, supplierEmail) {
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
            "readSupplierProduct",
            supplierEmail
        );
        return JSON.parse(result.toString());
    } catch (error) {
        console.log("Some error has occured please contact web Master");
    }
}


module.exports = {
    registerSupplier,
    initSupplier,
    addProductToSupplier,
    readSupplier,
    readSupplierProduct
}