export const formatTokenAmount = (amount, decimals) => {
  // 将数字拆分成整数部分和小数部分
  const [integerPart, decimalPart = ""] = amount.split(".");

  // 组合整数和小数部分
  let combined = integerPart + decimalPart;

  // 计算需要填充的零的数量
  const paddingLength = decimals - decimalPart.length;

  // 如果需要填充零，则填充
  if (paddingLength > 0) {
    combined = combined.padEnd(combined.length + paddingLength, "0");
  } else if (paddingLength < 0) {
    // 如果小数部分长度超出，需要截取
    combined = combined.slice(0, paddingLength);
  }

  combined = combined.replace(/^0+/, "");

  console.log("amount: " + amount + ", result: " + combined);

  return combined;
};
