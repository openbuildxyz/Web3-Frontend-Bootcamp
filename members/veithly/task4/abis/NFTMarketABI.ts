const abi = [
  {
    "inputs": [
      { "internalType": "address", "name": "_currencyToken", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }
    ],
    "name": "NFTBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "seller", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "nftContract", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "name": "NFTListed",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_nftContract", "type": "address" },
      { "internalType": "uint256", "name": "_tokenId", "type": "uint256" },
      { "internalType": "uint256", "name": "_price", "type": "uint256" }
    ],
    "name": "listNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_listingId", "type": "uint256" }
    ],
    "name": "buyNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "listingCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "listings",
    "outputs": [
      { "internalType": "address", "name": "seller", "type": "address" },
      { "internalType": "address", "name": "nftContract", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "uint256", "name": "price", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default abi;
