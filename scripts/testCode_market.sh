echo "==============================================================="
echo "                          Init Invoke Farmer Supplier"
echo "==============================================================="

peer chaincode instantiate -o orderer.example.com:7050 \
--tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
-C marketchannel -n market \
-c '{"Args":["init"]}' -P "OR ('Org1MSP.member','Org2MSP.member')" -v 1.0

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 2"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["initSupplier","xGod666","xgod666@gmail.com","12345678","Address will be placed here!"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 2"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["initCustomer","customer","customer@gmail.com","12345678","Address will be placed here!"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 3"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readCustomer","customer@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readSupplier","xgod666@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 5"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["addProductBySupplier","xgod666@gmail.com","product Name","product Desc","Type of product","12","21"]}'


sleep 3
echo "==============================================================="
echo "                          Chaincode Test 6"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["addProductToCartByCustomer","customer@gmail.com","product Name","product Desc","Type of product","12","21"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 6"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["addProductToCartByCustomer","customer@gmail.com","product Name","product Desc","Type of product","12","21"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 7"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["addProductToWishListByCustomer","customer@gmail.com","product Name","product Desc","Type of product","12","21"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 7"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID marketchannel --name market \
--peerAddresses peer0.org1.example.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
-c '{"Args":["addProductToCheckoutByCustomer","customer@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readCustomerWishList","customer@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readCustomerCart","customer@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["checkOutProduct","customer@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readSupplierProduct","xgod666@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readCustomerHistory","customer@gmail.com"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 4"
echo "==============================================================="
peer chaincode query \
--channelID marketchannel --name market \
-c '{"Args":["readSupplierHistory","xgod666@gmail.com"]}'