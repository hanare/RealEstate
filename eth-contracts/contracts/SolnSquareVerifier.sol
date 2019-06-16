pragma solidity >=0.4.21 <0.6.0;

// import './SquareVerifier.sol';
import './ERC721Mintable.sol';
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class


contract SolnSquareVerifier  is PropertyERC721Token{

    SquareVerifier squareVerifier;

    constructor(address squareVerifierAddress,string memory name, string memory symbol) PropertyERC721Token(name,symbol) public {

     squareVerifier = SquareVerifier(squareVerifierAddress);
    }
// TODO define a solutions struct that can hold an index & an address
 struct Solutions{
          
            bytes32 index;
            address tokenOwner;
 }

// TODO define an array of the above struct
    Solutions[]  solArray;

// TODO define a mapping to store unique solutions submitted

    mapping(uint256 => Solutions) uniqueSolution;


// TODO Create an event to emit when a solution is added
    event SolutionAdded(string msg);


// TODO Create a function to add the solutions to the array and emit the event

    function addSolution(uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input,uint256 tokenId) internal {
       
        bytes32 key = keccak256(abi.encodePacked( a, b, c, input));
        require(uniqueSolution[tokenId].index != key ,"Solution already exists");
        bool result = squareVerifier.verifyTx(a,b,c,input);
        require(result , "Invalid Proof");
        uniqueSolution[tokenId].index =  key;
        uniqueSolution[tokenId].tokenOwner =  msg.sender;
        emit SolutionAdded("Solution addded");
        
    }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

    function mintToken(uint[2] calldata a,
            uint[2][2] calldata b,
            uint[2] calldata c,
            uint[2] calldata input,address to ,uint256 tokenId)  external {
        addSolution(a,b,c,input,tokenId);
        mint(to,tokenId,"");
    }
}


contract SquareVerifier{
    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public returns (bool r);
}