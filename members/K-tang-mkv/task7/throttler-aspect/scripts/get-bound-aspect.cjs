

"use strict"
const Web3 = require("@artela/web3");
const fs = require("fs");
var argv = require('yargs')
    .string('node')
    .string('skfile')
    .string('contract')
    .argv;

async function aspectsOf() {
    // init connection to Artela node
    const configJson = JSON.parse(fs.readFileSync('./project.config.json', "utf-8").toString());

    let node = (argv.node) ? String(argv.node) : configJson.node;
    if (!node) {
        console.log("'node' cannot be empty, please set by the parameter or project.config.json")
        process.exit(0)
    }
    const web3 = new Web3(node);

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

    const aspectContract = new web3.atl.aspectCore();
    let boundAddresses= await aspectContract.methods["aspectsOf"](contractAddress).call()
    console.log("bound aspects : " + boundAddresses);
}

aspectsOf().then();
