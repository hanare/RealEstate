# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Test the project 
 * Clone the repo
 ``` git clone https://github.com/hanare/RealEstate.git ```
 *  navigate to the root dir and in cmd type ``` npm install ``` This will install all the dependencies required
 * To compile the all contract , navigate to eth-contract folder and type ``` truffle compile --all ```  
 * Start Ganache via the CLI or the GUI [ check the port and url in ganache and truffle-config.js match for development ]
 * To deploy the contract ```truffle migrate --reset --network <name_of_the_network> ```
 * To test the contract ``` truffle test ``` This will run all the test files.

 #OpenSea Storefront 
*  ``` https://rinkeby.opensea.io/assets/unidentifiedcontractv57 ```

# Command 
For generating proof 
 * Map your volume to the docker volumne
 ```docker run -v "$PWD/zokrates/code":/home/zokrates/code -it zokrates/zokrates /bin/bash```
 *   Compile the code (square.code)
 ``` path/to/zokrates compile -i <program_name>.code ```
 *  ``` /path/to/zokrates setup ```  Two keys are generated - 'proving.key' and  'verification.key'
 *  ``` /path/to/zokrates compute-witness -a <a> <b> ... <n>```    
 *  ``` /path/to/zokrates generate-proof ``` this will generate the proof.json file 
 
# Address of deployed contract 
 *   The contract with zokrates integeration is deployed on Rinkeby network.
 *   SolnSquareVerifier.sol contract address ```0x607800658a2328D9a808983A8087a6A9eA9186b5```
 *   SolnSquareVerifier Contract ABI : [a link](https://github.com/hanare/RealEstate/blob/master/SolnSquareVerifier.abi)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

