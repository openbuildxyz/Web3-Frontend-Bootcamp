
"use strict"
const Web3 = require("@artela/web3");
const fs = require("fs");
const argv = require('yargs')
    .string('node')
    .string('skfile')
    .string('gas')
    .string('wasm')
    .string('properties')
    .array('joinPoints')
    .argv;

async function deploy() {

    const ARTELA_ADDR = "0x0000000000000000000000000000000000A27E14";

    //---- web3 init---
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


    const propertiesJson = argv.properties
    let properties = []
    if (propertiesJson && propertiesJson !== 'undefined') {
        properties = JSON.parse(propertiesJson);
    }
    const joinPointsJson = argv.joinPoints
    let joinPoints = []
    if (joinPointsJson && joinPointsJson !== 'undefined') {
        joinPoints =joinPointsJson
    }

    //read wasm code
    let aspectCode = "";
    //  --wasm  ./build/release.wasm
    let wasmPath = String(argv.wasm)
    if (!wasmPath || wasmPath === 'undefined') {
        aspectCode = fs.readFileSync('./build/release.wasm', {encoding: "hex"});
    } else {
        aspectCode = fs.readFileSync(wasmPath, {encoding: "hex"});
    }
    if (!aspectCode || aspectCode === "" || aspectCode === 'undefined') {
        console.log("aspectCode cannot be empty")
        process.exit(0)
    }

    // to deploy aspect
    let aspect = new web3.atl.Aspect();
    let deploy = await aspect.deploy({
        data: '0x' + aspectCode,
        properties,
        joinPoints,
        paymaster: sender.address,
        proof: '0x0',
    });

    let tx = {
        from: sender.address,
        data: deploy.encodeABI(),
        to: ARTELA_ADDR,
        gasPrice,
        gas: !parseInt(argv.gas) | 9000000
    }
    let signedTx = await web3.atl.accounts.signTransaction(tx, sender.privateKey);
    console.log("sending signed transaction...");
    let ret = await web3.atl.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', receipt => {
            console.log(receipt);
        });
    let aspectID = ret.aspectAddress;
    console.log("ret: ", ret);
    console.log("== deploy aspectID ==", aspectID)
}

deploy().then();

