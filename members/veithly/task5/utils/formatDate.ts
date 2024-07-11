export const formatDate = (timestamp: BigInt) => {
  const date = new Date(Number(timestamp)*1000);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
