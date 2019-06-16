var PropertyERC721Token = artifacts.require('PropertyERC721Token');
const truffleAssert = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const name  = 'REALESTATE';
    const symbol = 'RET';
    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await PropertyERC721Token.new(name,symbol,{from: account_one});
            //console.log(this.contract);
            let result ;
            token_count=  10;
            for(let i = 1;i<=token_count;i++){
                result =   await this.contract.mint(accounts[1],i,"",{from: account_one});
            }           

            // TODO: mint multiple tokens
        })

        it('should return total supply', async function () { 
            let count;
            let returnsTokenSuppy =  true;
            try{
                count =   await this.contract.totalSupply();
                //console.log(count);
            }
            catch(e){
                returnsTokenSuppy =  false;
            }
            assert.equal(returnsTokenSuppy,true,"Failed to return token supply")
            assert.equal(count.toString(),token_count,"TokenCount mismatch");
            
        })

        it('should get token balance', async function () { 
          
            let balanceAfter,balanceBefore,result;
            let tokenId = token_count+1;
            balanceBefore =  await this.contract.balanceOf(accounts[5]);
            result =   await this.contract.mint(accounts[5],tokenId,"");
            balanceAfter =   await this.contract.balanceOf(accounts[5]);
            assert.equal(parseInt(balanceBefore.toString())+1,parseInt(balanceAfter),"Balance Incorrect ");
            
        });

       // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 

            const tokenURI =  await this.contract.tokenURI(1);
            const uri =  "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
            assert.equal(tokenURI,uri,"TokenURI mismatch");
            
        });

        it('should transfer token from one owner to another', async function () { 
            const from  =  accounts[1];
            const to =  accounts[2];
            const tokenId= 10;            
            let transfer =  await this.contract.transferFrom(accounts[1] ,accounts[3],tokenId,{from:  accounts[1]});
            truffleAssert.eventEmitted(transfer, 'Transfer', (ev) => {                 
               return parseInt(ev.tokenId.toString()) === tokenId;
            }, "Event:Transfer failed");

        })
     });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await PropertyERC721Token.new(name,symbol,{from: account_two});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let isOwner = true;
            try{
                let rs =  await this.contract.mint(account[1],tokenId,{from: accounts[5]});
            }catch(e){
                isOwner  = false;
            }
            assert.equal(isOwner,false , "Only Owner of cantract can Mint token");

        })

        it('should return contract owner', async function () { 
            
            let owner  =  await this.contract.getOwner.call();
            //console.log(owner);
            assert.equal(owner,account_two,"Owner of the contract ");

        })

    });
})