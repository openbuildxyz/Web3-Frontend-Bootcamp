const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_currencyToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "NFTBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "NFTListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_listingId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currencyToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllListings",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "nftContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTMarket.Listing[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listingCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default abi;
