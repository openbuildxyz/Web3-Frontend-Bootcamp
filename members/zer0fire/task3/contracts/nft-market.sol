
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

event ItemListed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
event Purchase(address indexed buyer, address indexed nftAddr, uint256 indexed tokenId, uint256 price);
event Revoke(address indexed seller, address indexed nftAddr, uint256 indexed tokenId);    
event Update(address indexed seller, address indexed nftAddr, uint256 indexed tokenId, uint256 newPrice);
event NftReceived(address indexed _from, address indexed _to, uint256 indexed _tokenId, bytes _data);



contract NftMarket is IERC721Receiver, ReentrancyGuard {

    struct Order{
        address owner;  
        uint256 price; 
    }


    mapping(address => mapping(uint256 => Order)) private nftList;


    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    modifier notListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Order memory listing = nftList[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Order memory listing = nftList[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }


    
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) public  override returns (bytes4){
        emit NftReceived(from, address(this), tokenId, data); 
        return IERC721Receiver.onERC721Received.selector;
    }

    fallback() external payable{}

    receive() external payable {
    }


    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    )
        external
        notListed(_nftAddress, _tokenId)
        isOwner(_nftAddress, _tokenId, msg.sender)
    {
        if (_price <= 0) {
            revert PriceMustBeAboveZero();
        }
        IERC721 _nft = IERC721(_nftAddress);  

        Order storage _order = nftList[_nftAddress][_tokenId];
        _order.owner = msg.sender;
        _order.price = _price;
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);




        emit ItemListed(msg.sender, _nftAddress, _tokenId, _price);
    }



    function revoke(address _nftAddr, uint256 _tokenId) 
        public 
        isOwner(_nftAddr, _tokenId, msg.sender)
        isListed(_nftAddr, _tokenId)
    {
        Order storage _order = nftList[_nftAddr][_tokenId];         
        require(_order.owner == msg.sender, "Not Owner"); 
        IERC721 _nft = IERC721(_nftAddr);


        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        delete nftList[_nftAddr][_tokenId]; 

        emit Revoke(msg.sender, _nftAddr, _tokenId);
    }


    function update(address _nftAddr, uint256 _tokenId, uint256 _newPrice) 
        public 
        isListed(_nftAddr, _tokenId)
        nonReentrant
        isOwner(_nftAddr, _tokenId, msg.sender) 
    {
        require(_newPrice > 0, "Invalid Price"); 
        Order storage _order = nftList[_nftAddr][_tokenId];         
        _order.price = _newPrice;

        
        emit Update(msg.sender, _nftAddr, _tokenId, _newPrice);
    }


    function purchase(address _nftAddr, uint256 _tokenId) 
        payable 
        public
        isListed(_nftAddr, _tokenId)
        nonReentrant
    {
        Order memory _order = nftList[_nftAddr][_tokenId];         
        require(_order.price > 0, "Invalid Price"); 
        require(msg.value >= _order.price, "Increase price"); 
        
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); 

        
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        
        payable(_order.owner).transfer(_order.price);
        payable(msg.sender).transfer(msg.value-_order.price);

        delete nftList[_nftAddr][_tokenId]; 

        
        emit Purchase(msg.sender, _nftAddr, _tokenId, msg.value);
    }


}