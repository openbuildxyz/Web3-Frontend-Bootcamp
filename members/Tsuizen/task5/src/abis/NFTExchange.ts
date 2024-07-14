export const NFTExchange = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'token',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      }
    ],
    name: 'NFTListed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      }
    ],
    name: 'NFTPurchased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'NFTRemoved',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'buyNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getListedNFTs',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'seller',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'nftContract',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'tokenUrl',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'listedAt',
            type: 'uint256'
          }
        ],
        internalType: 'struct NFTExchange.Listing[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_tokenUrl',
        type: 'string'
      }
    ],
    name: 'listNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'listings',
    outputs: [
      {
        internalType: 'address',
        name: 'seller',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'tokenUrl',
        type: 'string'
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'listedAt',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paymentToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'removeNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
