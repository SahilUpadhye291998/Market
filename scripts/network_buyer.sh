CRC_SRC_PATH="/opt/gopath/src/github.com/chaincode/market/node/"

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

echo "==========  Enviorment variables are set==============="

echo "======================================================"
peer channel create -o orderer.example.com:7050 -c marketchannel -f ./channel-artifacts/marketchannel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================Joining for peer0.org1.example.com:7051======================="
peer channel join -b marketchannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org1.example.com====================="
peer channel update -o orderer.example.com:7050 -c marketchannel -f ./channel-artifacts/Org1MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================channel install for peer0.org1.example.com====================="
peer chaincode install -n market -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/market/node/
echo "====================================================="
