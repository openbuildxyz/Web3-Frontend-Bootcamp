import { BigNumber, ethers } from 'ethers';

export const getNfts = async (address: any) => {
  try {
    const baseURL =
      'https://eth-sepolia.g.alchemy.com/v2/ywgT-Uea3J3QNFoOeZ5rjAdKyG1Yze5z';
    const url = `${baseURL}/getNFTs/?owner=${address}`;

    const requestOptions = {
      method: 'get',
      redirect: 'follow',
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export function hexToDecimal(hexString) {
  // 去掉十六进制字符串的前缀“0x”
  if (hexString?.startsWith('0x')) {
    hexString = hexString.substring(2);
  }

  // 将十六进制字符串转换为十进制数
  return BigInt(`0x${hexString}`).toString(10);
}

export function timestampToLocalTime(timestamp) {
  // 创建一个 Date 对象
  const date = new Date(timestamp);

  // 格式化日期和时间
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 返回本地时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function convertHexToDecimal(hexObject) {
  if (hexObject && hexObject._hex) {
    return parseInt(hexObject._hex, 16);
  } else {
    return 0;
  }
}

export function getNftandTokenIdPair(lists) {
  const idPairList = lists.map((item) => {
    return {
      tokenId: item.tokenId,
      nftAddress: item.nftContract,
    };
  });

  return idPairList;
}

export function transformData(dataFromContract) {
  const transformedArray = dataFromContract.map((item) => {
    return {
      itemId: item.itemId,
      tokenId: item.tokenId,
      seller: item.seller,
      owner: item.owner,
      price: item.price,
      isSold: item.isSold,
      isUpForSale: item.isUpForSale,
      exists: item.exists,
      listingTimestamp: item.listingTimestamp,
      createdTimestamp: item.createdTimestamp,
      nftContract: item.nftContract,
    };
  });
  return transformedArray;
}

export const getContractAbi = async (contractAddress) => {
  const response = await fetch(
    `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`
  );
  const data = await response.json();
  return data.result;
};

export async function fetchNFTMetadata(tokenId, nftAddress) {
  try {
    const contractAbi = await getContractAbi(nftAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftAddress, contractAbi, signer);
    const tokenURI = await nftContract.tokenURI(tokenId);
    const response = await fetch(tokenURI);
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error(
      `Error fetching metadata for tokenId ${tokenId} from contract ${nftAddress}:`,
      error
    );
    return null;
  }
}

export async function getAllNFTMetadata(nftArray) {
  const metadataArray = [];

  for (const nft of nftArray) {
    const metadata = await fetchNFTMetadata(nft.tokenId, nft.nftAddress);
    if (metadata) {
      metadataArray.push({
        tokenId: nft.tokenId,
        nftAddress: nft.nftAddress,
        metadata,
      });
    }
  }

  return metadataArray;
}

export function mergeArraysByNFT(a, b) {
  return b.map((itemB) => {
    const matchingItemA = a.find(
      (itemA) =>
        itemA.nftAddress === itemB.nftContract &&
        BigNumber.from(itemA.tokenId).eq(BigNumber.from(itemB.tokenId))
    );
    return matchingItemA ? { ...itemB, ...matchingItemA } : itemB;
  });
}
