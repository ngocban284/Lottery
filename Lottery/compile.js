const path = require("path");
const fs = require('fs');
const solc = require('solc');

const lotteryPath  = path.resolve(__dirname,'contracts','Lottery.sol');
const source = fs.readFileSync(lotteryPath,'utf-8');


var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {content: source}
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

// console.log(solc.compile(JSON.stringify(input)));

var output = JSON.parse(solc.compile(JSON.stringify(input)));

const interface = output.contracts['Lottery.sol']['Lottery'].abi;
const bytecode = output.contracts['Lottery.sol']['Lottery'].evm.bytecode.object;

module.exports = {
    interface,
    bytecode
}