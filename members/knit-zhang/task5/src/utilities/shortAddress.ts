export default function shortAddress(address: `0x${string}` | undefined) {
  if (address) return `${address.slice(0, 6)}...${address.slice(-4)}`;
  else throw Error("address is undefined");
}
