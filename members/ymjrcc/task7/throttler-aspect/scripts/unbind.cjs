

"use strict"
const Web3 = require("@artela/web3");
const fs = require("fs");
var argv = require('yargs')
    .string('node')
    .string('skfile')
    .string('contract')
    .string('aspectId')
    .string('gas')
    .argv;

async function unbind() {
    // init connection to Artela node
    const configJson = JSON.parse(fs.readFileSync('./project.config.json', "utf-8").toString());

    let node = (argv.node) ? String(argv.node) : configJson.node;
    if (!node) {
        console.log("'node' cannot be empty, please set by the parameter or project.config.json")
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
    web3.eth.accounts.wallet.add(sender.privateKey);

    // --contract {smart-contract-address}
    let contractAddress = String(argv.contract)
    if (!contractAddress || contractAddress === 'undefined') {
        console.log("'contractAddress' cannot be empty, please set by the parameter ' --contract 0xxxx'")
        process.exit(0)
    }

    // --aspectId {aspect-Id}
    let aspectId = String(argv.aspectId)
    if (!aspectId || aspectId === 'undefined') {
        console.log("'aspectId' cannot be empty, please set by the parameter' --aspectId 0xxxx'")
        process.exit(0)
    }

    const aspectContract = new web3.atl.aspectCore();
    // bind the smart contract with aspect
    const unbind = await aspectContract.methods.unbind(
        aspectId,
        contractAddress
    )

    const tx = {
        from: sender.address,
        data: unbind.encodeABI(),
        gasPrice,
        to: aspectContract.options.address,
        gas: !parseInt(argv.gas) | 9000000
    }

    const signedTx = await web3.eth.accounts.signTransaction(tx, sender.privateKey);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', receipt => {
            console.log(receipt);
        });
    console.log("== aspect unbind success ==");

}

unbind().then();
