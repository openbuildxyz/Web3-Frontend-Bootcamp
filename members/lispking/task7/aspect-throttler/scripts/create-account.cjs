
"use strict"

// import required libs
const fs = require('fs');
const path = require('path');
const Web3 = require("@artela/web3");
var argv = require('yargs')
    .string('skfile')
    .argv;


async function create() {

    const configJson = JSON.parse(fs.readFileSync('./project.config.json', "utf-8").toString());
    // init connection to Artela node
    let node = (argv.node)?String(argv.node):configJson.node;
    if(!node){
        console.log("'node' cannot be empty, please set by the parameter or artela.config.json")
        process.exit(0)
    }
    const web3 = new Web3(node);

    let privateFile = 'privateKey.txt'; // <-- your private key here, if not exist, create new one
    if(argv.skfile){
        privateFile=argv.skfile;
    }
    let account;
    if (fs.existsSync(privateFile)) {
        let pk = fs.readFileSync(privateFile, 'utf-8');
        account = web3.atl.accounts.privateKeyToAccount(pk.trim());
    } else {
        account = web3.atl.accounts.create();
        const dirPath = path.dirname(privateFile);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(privateFile, account.privateKey);
    }

    // add account to wallet
    web3.atl.accounts.wallet.add(account.privateKey);
    console.log("address: ", account.address);
}

create().then();
