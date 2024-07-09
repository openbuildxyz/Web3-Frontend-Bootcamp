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
