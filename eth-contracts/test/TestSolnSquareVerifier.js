// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var SquareVerifier = artifacts.require("SquareVerifier");
var Proof = require('../../zokrates/code/square/proof1.json');
const truffleAssert = require('truffle-assertions');
//var Proof = require('../../zokrates/code/square/proof1.json');
contract('SolnSquareVerifier', accounts => {

    describe("Add new Solution ", () => {

        beforeEach(async () => {
            const name = 'REALESTATE1';
            const symbol = 'RET1';
            this.SquareVerifierContract = await SquareVerifier.new();
            this.SolnSquareContract = await SolnSquareVerifier.new(this.SquareVerifierContract.address, name, symbol);

        });

        it('mint token ', async () => {

            let tokenId = "1000";
            //console.log(Proof);
            //console.log("account ", accounts[2]);
            let countBefore = await this.SolnSquareContract.totalSupply();
           // console.log("Count of token ", countBefore);
            let result = await this.SolnSquareContract.mintToken(Proof.proof.a, Proof.proof.b, Proof.proof.c, Proof.inputs, accounts[2], tokenId);
            //console.log(result);
            let countAfter = await this.SolnSquareContract.totalSupply();
            //console.log("Count of token ", countAfter);
            truffleAssert.eventEmitted(result, 'Transfer', (ev) => {
            //console.log(ev, "----", result.logs," **********" ,result.logs[1]);
               return ev.tokenId.toString() === result.logs[1].args.tokenId.toString();
               //return true;
            }, "Event:Token minting  failed");
            assert.equal((parseInt(countBefore.toString())) + 1, parseInt(countAfter), " Token Creation Failed ");
            
        });
        it('mint token multiple token with same proof', async () => {

            let tokenId = "1";
            //console.log(Proof);
            //console.log("account ", accounts[2]);
            let countBefore, result, countAfter;
            let success = true;
            try {
                countBefore = await this.SolnSquareContract.totalSupply();
                //console.log("Count of token ", countBefore);
                result = await this.SolnSquareContract.mintToken(Proof.proof.a, Proof.proof.b, Proof.proof.c, Proof.inputs, accounts[2], tokenId);
                //console.log(result);
                countAfter = await this.SolnSquareContract.totalSupply();
                console.log("Count of token ", countAfter);
                
                assert.equal((parseInt(countBefore.toString())) + 1, parseInt(countAfter), " Token Creation Failed ");
                result = await this.SolnSquareContract.mintToken(Proof.proof.a, Proof.proof.b, Proof.proof.c, Proof.inputs, accounts[2], tokenId);
                countAfter = await this.SolnSquareContract.totalSupply();
               // console.log("Count of token ", countAfter);
                
                assert.equal((parseInt(countBefore.toString())) + 1, parseInt(countAfter), " Token Creation Failed ");
            } catch(ex){
                success =  false;
            }
            assert.equal(success,false,"Allowing to create multiple token with same proof");
            });

    })

});