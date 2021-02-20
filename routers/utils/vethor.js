const Transaction = require('thor-devkit').Transaction;
const secp256k1 = require('thor-devkit').secp256k1;

const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), "http://127.0.0.1:8669");

const contractAddress = "0x58F4A6c282a8443c5756bEF43842620d220b644d";

let privateKey = '0xdce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65';

let privateKeyBuffer = Buffer.from(privateKey.slice(2), 'hex');

let accountAddress = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed';


// let account = web3.eth.accounts.privateKeyToAccount(privateKey);

// let wallet = web3.eth.accounts.wallet;

// wallet.add(account);

// console.log(account);

let abi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_time",
                "type": "string"
            },
            {
                "internalType": "uint256[]",
                "name": "_datas",
                "type": "uint256[]"
            }
        ],
        "name": "createData",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dataCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "dataList",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_dataId",
                "type": "uint256"
            }
        ],
        "name": "getData",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDataCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_time",
                "type": "string"
            }
        ],
        "name": "getDataId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLatestData",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "timeToData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(abi, contractAddress);

async function createData(time, arr) {

    let data = contract.methods.createData(time, arr).encodeABI();

    let clauses = [{
        'to': contractAddress,
        'value': '0x0',
        'data': data
    }];

    let gas = Transaction.intrinsicGas(clauses) * 100;

    let blockRef = await web3.eth.getBlock('latest')
        .then(res => {
            return res.id.substr(0, 18);
        });

    let body = {
        chainTag: 0xa4,
        blockRef: blockRef,
        expiration: 32,
        clauses: clauses,
        gasPriceCoef: 128,
        gas: gas,
        dependsOn: null,
        nonce: '0x01'
    };

    let tx = new Transaction(body);

    let signingHash = tx.signingHash();

    tx.signature = secp256k1.sign(signingHash, privateKeyBuffer);

    let raw = tx.encode();

    let rawTx = '0x' + raw.toString('hex');

    // return rawTx;

    return await web3.eth.sendSignedTransaction(rawTx);

}

async function getData(_dataId) {
    return await contract.methods.getData(_dataId).call();
}

async function getLatestData() {
    return await contract.methods.getLatestData().call();
}

async function getDataCounter() {
    return await contract.methods.getDataCounter().call();
}

async function getDataId(_time) {
    return await contract.methods.getDataId(_time).call();
}


// (async () => {
// let data = await createData(123, [1, 2, 3, 4, 5]);

// console.log(await data);

// console.log(await getLatestData());
// })();


module.exports = {
    createData,
    getData,
    getDataId,
    getLatestData
}
