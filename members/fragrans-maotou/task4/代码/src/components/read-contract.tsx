import { useReadContract } from 'wagmi'
import { ERC20TokenAbi } from '../abi/ERC20TokenAbi'
import { ethers } from 'ethers';
import { useState } from 'react';
import { erc20_address } from "../utils/env.config";
export const ReadContract = () => {
  const [totalSupply, setTotalSupply] = useState<string | null>(null);

  const { data, isLoading, error } = useReadContract({
    abi: ERC20TokenAbi,
    address: erc20_address,
    functionName: 'totalSupply',
  })

  const provider = new ethers.JsonRpcProvider('http://localhost:8545'); // 修改为你的本地网络 RPC URL
  const contractAddress = erc20_address;
  const contract = new ethers.Contract(contractAddress, ERC20TokenAbi, provider);
  async function getTotalSupply() {
    try {
      const supply = await contract.totalSupply();
      console.log('Total Supply:', supply.toString());
      return supply.toString();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }

  }
  const handleTotalSupply = async () => {
    console.log("dianji");
    const supply = await getTotalSupply();
    setTotalSupply(supply);
  }
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("datadatadata--", data);

  return (
    <div className='mb-1'>
      Total Supply:{data ? data.toString() : 'N/A'}
      <div onClick={handleTotalSupply}>
        点击获取total{totalSupply}
      </div>
    </div>
  )
}