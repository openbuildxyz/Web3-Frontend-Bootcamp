// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// 导入IERC721和IERC20接口
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// 导入ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
	struct Listing {
		uint256 price; // NFT的售价，以ERC20代币计
		address seller; // 卖家地址
	}

	struct NFTListingInfo {
		IERC721 nft; // NFT合约的接口
		uint256 tokenId; // NFT的tokenId
		uint256 price; // NFT的售价
		address seller; // 卖家地址
		uint256 listingTime; // 上架时间
	}

	IERC20 public erc20Token; // 自定义ERC20代币的接口
	mapping(address => mapping(uint256 => Listing)) public listings; // 存储NFT列表信息
	mapping(uint256 => uint256) public listedNFTsIndex; // 存储NFT的tokenId和对应的索引
	uint256 public nextNFTIndex = 0; // 用于追踪下一个NFT的索引
	NFTListingInfo[] public allListedNFTs; // 存储所有上架NFT的信息

	event ItemListed(
		address indexed seller,
		address indexed nftToken,
		uint256 tokenId,
		uint256 price
	);
	event ItemPurchased(
		address indexed buyer,
		address indexed nftToken,
		uint256 tokenId,
		uint256 price
	);
	event ItemDelisted(
		address indexed seller,
		address indexed nftToken,
		uint256 tokenId
	);

	constructor(IERC20 _erc20Token) {
		erc20Token = _erc20Token;
	}

	function listItem(
		IERC721 nft,
		uint256 tokenId,
		uint256 price
	) external nonReentrant {
		require(price > 0, "Price must be greater than zero");
		require(
			nft.getApproved(tokenId) == address(this) ||
				nft.isApprovedForAll(msg.sender, address(this)),
			"Marketplace must be approved to transfer the item"
		);

		listings[address(nft)][tokenId] = Listing(price, msg.sender);
		// 添加到索引映射
		listedNFTsIndex[tokenId] = nextNFTIndex;
		// 添加到所有上架NFT的列表
		allListedNFTs.push(
			NFTListingInfo({
				nft: nft,
				tokenId: tokenId,
				price: price,
				seller: msg.sender,
				listingTime: block.timestamp
			})
		);
		// 更新索引
		nextNFTIndex++;
		emit ItemListed(msg.sender, address(nft), tokenId, price);
	}

	// purchaseItem函数允许买家使用ERC20代币购买市场上的NFT
	function purchaseItem(IERC721 nft, uint256 tokenId) external nonReentrant {
		Listing storage listing = listings[address(nft)][tokenId];
		require(listing.price > 0, "Item is not listed for sale");

		uint256 price = listing.price;
		require(
			msg.sender != listing.seller,
			"Seller cannot buy their own listed NFT"
		);

		require(
			erc20Token.balanceOf(msg.sender) >= price,
			"Insufficient balance"
		);
		require(
			erc20Token.allowance(msg.sender, address(this)) >= price,
			"Allowance not set"
		);

		// 转移ERC20代币到卖家
		erc20Token.transferFrom(msg.sender, listing.seller, price);

		// 转移NFT所有权到买家
		nft.transferFrom(listing.seller, msg.sender, tokenId);

		// 从市场上撤下NFT，删除listings映射中的信息
		delete listings[address(nft)][tokenId];

		// 从allListedNFTs数组中移除对应的NFT列表信息
		uint256 index = listedNFTsIndex[tokenId];
		require(index != 0, "Index not found"); // 确保索引存在

		// 交换最后一个元素到当前位置并删除最后一个元素
		allListedNFTs[index - 1] = allListedNFTs[allListedNFTs.length - 1];
		delete allListedNFTs[allListedNFTs.length - 1];

		// 更新索引映射，将最后一个元素的索引更新为当前索引
		listedNFTsIndex[allListedNFTs[index - 1].tokenId] = index;

		emit ItemPurchased(msg.sender, address(nft), tokenId, price);
	}

	function delistItem(IERC721 nft, uint256 tokenId) external nonReentrant {
		Listing storage listing = listings[address(nft)][tokenId];
		require(
			listing.seller == msg.sender,
			"Only the seller can delist the NFT"
		);
		require(listing.price > 0, "Item is not listed for sale");

		// 找到对应的NFTListingInfo结构体并从allListedNFTs中移除
		for (uint256 i = 0; i < allListedNFTs.length; i++) {
			if (
				allListedNFTs[i].tokenId == tokenId &&
				allListedNFTs[i].nft == nft
			) {
				// 找到要删除的元素，从索引映射中删除
				delete listedNFTsIndex[tokenId];

				// 交换最后一个元素到当前位置并删除最后一个元素
				allListedNFTs[i] = allListedNFTs[allListedNFTs.length - 1];
				delete allListedNFTs[allListedNFTs.length - 1];

				break;
			}
		}

		// 从listings映射中删除
		delete listings[address(nft)][tokenId];

		emit ItemDelisted(msg.sender, address(nft), tokenId);
	}

	function queryAllListedNFTs()
		external
		view
		returns (NFTListingInfo[] memory)
	{
		return allListedNFTs;
	}
}
