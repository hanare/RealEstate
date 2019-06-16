// migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var SquareVerifier = artifacts.require("SquareVerifier");
var PropertyERC721Token = artifacts.require('PropertyERC721Token');


module.exports = function (deployer) {
  const name = 'REALESTATE';
  const symbol = 'RET';
  deployer.deploy(PropertyERC721Token, name, symbol).then((result) => {
   // console.log(result);
   //console.log(" PropertyERC721Token   ", PropertyERC721Token.address, name, symbol);
    return deployer.deploy(SquareVerifier).then((result) => {
      //console.log("SQUARE VERIFIER ", result);
      //console.log("Square Verifier ", SquareVerifier.address);
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address, name, symbol).then((result) => {
       // console.log("SOlSQUARE VERIFIER ", result);
        //console.log("Soln Square Verifier ", SolnSquareVerifier.address, name, symbol);
      });
    });
  });
};

// module.exports = function (deployer) {
//   const name = 'REALESTATE';
//   const symbol = 'RET';
   
//  deployer.deploy(SolnSquareVerifier, "0xEAe38B854f377B9cB858fCBd641B8b6b557917c6", name, symbol).then((result) => {
//         console.log("SOlSQUARE VERIFIER ", result);
//         console.log("Soln Square Verifier ", SolnSquareVerifier.address, name, symbol);
//       });
// };
