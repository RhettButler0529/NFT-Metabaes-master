// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;
// import "@openzeppelin/contracts/utils/Context.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "@openzeppelin/contracts/utils/Address.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Metabaes is ERC721, Ownable {

    using SafeMath for uint256;

    string public METABAES_PROVENANCE = ""; // IPFS URL WILL BE ADDED WHEN METABAES ARE ALL SOLD OUT
    
    string public LICENSE_TEXT = ""; // IT IS WHAT IT SAYS
    
    bool licenseLocked = false; // TEAM CAN'T EDIT THE LICENSE AFTER THIS GETS TRUE

    uint256 public constant metabaesPrice = 25000000000000000; // 0.025 ETH

    uint public constant maxMetabaesPurchase = 20;

    uint256 public constant MAX_METABAES = 7777;

    // bool public saleIsActive = false;
    
    mapping(uint => string) public metabaesNames;
    
    // Reserve 125 Metabaes for team - Giveaways/Prizes etc
    uint public metabaesReserve = 125;
    
    event metabaesNameChange(address _by, uint _tokenId, string _name);
    
    event licenseisLocked(string _licenseText);

    // constructor(address _proxyRegistryAddress)
    //     ERC721Tradable("Metabaes", "MTB", _proxyRegistryAddress)
    // {}
    constructor() ERC721("Metabaes", "MTB") {}

    // function baseTokenURI() override public pure returns (string memory) {
    //     return "https://creatures-api.opensea.io/api/creature/";
    // }

    // function contractURI() public pure returns (string memory) {
    //     return "https://creatures-api.opensea.io/contract/opensea-creatures";
    // }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
    
    function reserveMetabaes(address _to, uint256 _reserveAmount) public onlyOwner {        
        uint supply = totalSupply();
        require(_reserveAmount > 0 && _reserveAmount <= metabaesReserve, "Not enough reserve left for team");
        for (uint i = 0; i < _reserveAmount; i++) {
            _safeMint(_to, supply + i);
        }
        metabaesReserve = metabaesReserve.sub(_reserveAmount);
    }


    function setProvenanceHash(string memory provenanceHash) public onlyOwner {
        METABAES_PROVENANCE = provenanceHash;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _setBaseURI(baseURI);
    }


    // function flipSaleState() public onlyOwner {
    //     saleIsActive = !saleIsActive;
    // }
    
    
    function tokensOfOwner(address _owner) external view returns(uint256[] memory ) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 index;
            for (index = 0; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }
            return result;
        }
    }
    
    // Returns the license for tokens
    function tokenLicense(uint _id) public view returns(string memory) {
        require(_id < totalSupply(), "CHOOSE A METABAES WITHIN RANGE");
        return LICENSE_TEXT;
    }
    
    // Locks the license to prevent further changes 
    function lockLicense() public onlyOwner {
        licenseLocked =  true;
        emit licenseisLocked(LICENSE_TEXT);
    }
    
    // Change the license
    function changeLicense(string memory _license) public onlyOwner {
        require(licenseLocked == false, "License already locked");
        LICENSE_TEXT = _license;
    }
    
    
    function mintMetabaes(uint numberOfTokens) public payable {
        // require(saleIsActive, "Sale must be active to mint METABAES");
        require(numberOfTokens > 0 && numberOfTokens <= maxMetabaesPurchase, "Can only mint 20 tokens at a time");
        require(totalSupply().add(numberOfTokens) <= MAX_METABAES, "Purchase would exceed max supply of Metabaes");
        require(msg.value >= metabaesPrice.mul(numberOfTokens), "Ether value sent is not correct");
        
        for(uint i = 0; i < numberOfTokens; i++) {
            uint mintIndex = totalSupply();
            if (totalSupply() < MAX_METABAES) {
                _safeMint(msg.sender, mintIndex);
            }
        }

    }
     
    function changeMetabaesName(uint _tokenId, string memory _name) public {
        require(ownerOf(_tokenId) == msg.sender, "Hey, your wallet doesn't own this metabaes!");
        require(sha256(bytes(_name)) != sha256(bytes(metabaesNames[_tokenId])), "New name is same as the current one");
        metabaesNames[_tokenId] = _name;
        
        emit metabaesNameChange(msg.sender, _tokenId, _name);
        
    }
    
    function viewMetabaesName(uint _tokenId) public view returns( string memory ){
        require( _tokenId < totalSupply(), "Choose a metabase within range" );
        return metabaesNames[_tokenId];
    }
    
    
    // GET ALL METABAES OF A WALLET AS AN ARRAY OF STRINGS. WOULD BE BETTER MAYBE IF IT RETURNED A STRUCT WITH ID-NAME MATCH
    function metabaesNamesOfOwner(address _owner) external view returns(string[] memory ) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            // Return an empty array
            return new string[](0);
        } else {
            string[] memory result = new string[](tokenCount);
            uint256 index;
            for (index = 0; index < tokenCount; index++) {
                result[index] = metabaesNames[ tokenOfOwnerByIndex(_owner, index) ] ;
            }
            return result;
        }
    }
}