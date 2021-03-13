const FabricCAServices = require("fabric-ca-client");
const { FileSystemWallet, X509WalletMixin } = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function enrollCustomer() {
    try {
        // Create a new CA client for interacting with the CA.
        let ccpPath = path.resolve(__dirname, "..", "..", "connection-org1.json");
        let ccpJSON = fs.readFileSync(ccpPath, "utf8");
        let ccp = JSON.parse(ccpJSON);
        let caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
        let caTLSCACerts = caInfo.tlsCACerts.pem;
        let ca = new FabricCAServices(
            caInfo.url,
            { trustedRoots: caTLSCACerts, verify: false },
            caInfo.caName
        );

        // Create a new file system based wallet for managing identities.
        let walletPath = path.join(process.cwd(), "wallet");
        let wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        let adminExists = await wallet.exists("adminOrg1");
        if (adminExists) {
            console.log(
                'An identity for the admin user "admin" already exists in the wallet'
            );
            return;
        }
        // Enroll the admin user, and import the new identity into the wallet.
        let enrollment = await ca.enroll({
            enrollmentID: "admin",
            enrollmentSecret: "adminpw",
        });
        let identityOrg1 = X509WalletMixin.createIdentity(
            "Org1MSP",
            enrollment.certificate,
            enrollment.key.toBytes()
        );
        await wallet.import("adminOrg1", identityOrg1);
        console.log(
            'Successfully enrolled adminOrg1 user "adminOrg1" and imported it into the wallet'
        );
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
    }
}

async function enrollSupplier() {
    try {
        // Create a new CA client for interacting with the CA.
        let ccpPath = path.resolve(__dirname, "..", "..", "connection-org2.json");
        let ccpJSON = fs.readFileSync(ccpPath, "utf8");
        let ccp = JSON.parse(ccpJSON);
        let caInfo = ccp.certificateAuthorities["ca.org2.example.com"];
        let caTLSCACerts = caInfo.tlsCACerts.pem;
        let ca = new FabricCAServices(
            caInfo.url,
            { trustedRoots: caTLSCACerts, verify: false },
            caInfo.caName
        );

        // Create a new file system based wallet for managing identities.
        let walletPath = path.join(process.cwd(), "wallet");
        let wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        let adminExists = await wallet.exists("adminOrg2");
        if (adminExists) {
            console.log(
                'An identity for the admin user "admin" already exists in the wallet'
            );
            return;
        }
        // Enroll the admin user, and import the new identity into the wallet.
        let enrollment = await ca.enroll({
            enrollmentID: "admin",
            enrollmentSecret: "adminpw",
        });
        let identityOrg2 = X509WalletMixin.createIdentity(
            "Org2MSP",
            enrollment.certificate,
            enrollment.key.toBytes()
        );
        await wallet.import("adminOrg2", identityOrg2);
        console.log(
            'Successfully enrolled adminOrg2 user "adminOrg2" and imported it into the wallet'
        );
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
    }
}

module.exports = {
    enrollCustomer,
    enrollSupplier,
};
