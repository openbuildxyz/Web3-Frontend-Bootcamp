

"use strict"

// import required libs
const fs = require('fs');
const Web3 = require('@artela/web3');
var argv = require('yargs')
    .string('node')
    .string('skfile')
    .array('args')
    .string('contract')
    .string('gas')
    .string('method')
    .string('abi')
    .parserConfiguration({
        "parse-numbers": false,
    })
    .default('contract', '0xaB9B751571253d339B132A0Ca82cac824BD7A5e7')
    .default('abi', './build/contract/Counter.abi')
    .default('method', 'increment')
    .argv;

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function send() {
    // init connection to Artela node
    const configJson = JSON.parse(fs.readFileSync('./project.config.json', "utf-8").toString());
    // init connection to Artela node
    let node = (argv.node) ? String(argv.node) : configJson.node;
    if (!node) {
        console.log("'node' cannot be empty, please set by the parameter or artela.config.json")
        process.exit(0)
    }
    const web3 = new Web3(node);
    let gasPrice = await web3.eth.getGasPrice();

    //--skfile ./build/privateKey.txt
    let senderPriKey = String(argv.skfile)
    if (!senderPriKey || senderPriKey === 'undefined') {
        senderPriKey = "privateKey.txt"
    }
    if (!fs.existsSync(senderPriKey)) {
        console.log("'account' cannot be empty, please set by the parameter ' --skfile ./build/privateKey.txt'")
        process.exit(0)
    }
    let pk = fs.readFileSync(senderPriKey, 'utf-8');
    let sender = web3.eth.accounts.privateKeyToAccount(pk.trim());
    console.log("from address: ", sender.address);
    web3.eth.accounts.wallet.add(sender.privateKey);


    // --contract 0x9999999999999999999999999999999999999999
    const contractAddr = argv.contract;
    if (!contractAddr) {
        console.log("'contract address' cannot be empty, please set by the parameter ' --contract 0x9999999999999999999999999999999999999999'")
        process.exit(0)
    }

    // --abi xxx/xxx.abi
    const abiPath = String(argv.abi)
    let abi = null
    if (abiPath && abiPath !== 'undefined') {
        abi = JSON.parse(fs.readFileSync(abiPath, "utf-8").toString());
    } else {
        console.log("'abi' cannot be empty, please set by the parameter' --abi xxx/xxx.abi'")
        process.exit(0)
    }

    // --args [55]
    const inputs = argv.args;
    let parameters = [];
    if (inputs && inputs !== 'undefined') {
        parameters = inputs;
    }
    //--method count
    const method = argv.method;
    if (!method || method === 'undefined') {
        console.log("'method' cannot be empty, please set by the parameter ' --method {method-name}'")
        process.exit(0)
    }

    let storageInstance = new web3.eth.Contract(abi, contractAddr);
    let instance = storageInstance.methods[method](...parameters);
    let txCount = await web3.eth.getTransactionCount(sender.address);
    let promises = []
    for (let i = 0; i < 100; i++) {
        console.log('#' + i)
        let tx = {
            from: sender.address,
            to: contractAddr,
            data: instance.encodeABI(),
            gasPrice,
            gas: !parseInt(argv.gas) | 4000000,
            nonce: txCount + i
        }
        let signedTx = await web3.eth.accounts.signTransaction(tx, sender.privateKey);
        console.log('call contract tx hash: ' + signedTx.transactionHash);
        try {
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log(receipt)
        } catch (e) {
            console.log(`transaction throttled, let's wait for 10 seconds: ${e.message}`);
            // sleep if transaction reverted
            await sleep(10);
        }
    }
    return Promise.all(promises)
}

send().then();
