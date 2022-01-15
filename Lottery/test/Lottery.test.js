const Web3 = require('web3');
const ganache = require('ganache-cli');
const assert = require('assert');

const provider = ganache.provider();
const web3 = new Web3(provider);

const Web3Utils = require('web3-utils');

const {interface , bytecode }= require('../compile');

let lottery;
let accounts;


beforeEach(async()=>{
    accounts = await  web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(interface)
                            .deploy({data:bytecode})
                            .send({from:accounts[0],gas:"1000000"});
});


describe('Lottery Contract',()=>{

    // it('deploys a contract',()=>{
    //     assert.ok(lottery.options.address);
    // });

    // it('allows one account to enter',async()=>{
    //     await lottery.methods.enter().send({
    //         from:accounts[0],
    //         value: Web3Utils.toWei('0.02','ether')
    //     });

    //     const players = await lottery.methods.getPlayers().call({
    //         from:accounts[0]
    //     });

    //     assert.equal(accounts[0],players[0]);
    //     assert.equal(1,players.length);
    // });



    // it('allows multiple account to enter',async()=>{
    //     await lottery.methods.enter().send({
    //         from:accounts[0],
    //         value: Web3Utils.toWei('0.02','ether')
    //     });

    //     await lottery.methods.enter().send({
    //         from:accounts[1],
    //         value: Web3Utils.toWei('0.02','ether')
    //     });

    //     const players = await lottery.methods.getPlayers().call({
    //         from:accounts[0]
    //     });

    //     assert.equal(accounts[0],players[0]);
    //     assert.equal(accounts[1],players[1]);
    //     assert.equal(2,players.length);
    // });


    // it('requires a minimum amont of ether to enter',async()=>{
    //     try{ // thử try trước , nếu try lỗi thì chạy catch
    //         await lottery.methods.enter().send({
    //             from:accounts[0],
    //             value:0
    //         });
    //         assert(false);
    //     } catch(err){
    //         assert.ok(err);
    //     }
    // });

    // it('only manager can call pickWinner',async()=>{
    //     try{
    //         await lottery.methods.pickWinner().send({
    //             from:accounts[1]
    //         });
    //         assert(false);
    //     }catch(err){
    //         assert(err);
    //     }
    // });

    
    it('sends money to winner and resets a player array',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:Web3Utils.toWei('2','ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });
        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance- initialBalance;
        console.log(difference);
        assert(difference>Web3Utils.toWei('1.8','ether'));
    });
});