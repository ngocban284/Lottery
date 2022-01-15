const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface , bytecode }= require('./compile');
const util = require('util');

const provider = new HDWalletProvider(
    'chalk check buyer magnet captain pool cook kitten among scrub embody sting',
    'https://rinkeby.infura.io/v3/598a0f1dd5e347debc2776c1c35ed1c1'
);

const web3 = new Web3(provider);

const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Attemping to deploy from account ",accounts[0]);

    const result = await new web3.eth.Contract(interface)
                                        .deploy({data:bytecode})
                                        .send({gas:'10000000',from:accounts[0]});
    console.log(util.inspect(interface, false, null, true /* enable colors */))
    console.log("Contract deployed to",result.options.address);

};
deploy();