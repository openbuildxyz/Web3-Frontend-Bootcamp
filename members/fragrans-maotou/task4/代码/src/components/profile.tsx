import { useAccount, useBalance, useWriteContract, useReadContract } from 'wagmi'
import { wagmiERC20Contract, nftMarket_address } from "../utils/env.config"
import { useState } from 'react';
export function Profile() {
  const [priceValue, setPriceValue] = useState<number>(Number(0));

  const { address } = useAccount()
  console.log(address);

  const { writeContract } = useWriteContract();
  const { data, error, status } = useBalance({
    address: address
  })

  const allowanceResult = useReadContract({
    ...wagmiERC20Contract,
    functionName: 'allowance',
    args: [address, nftMarket_address],
  })

  const allowance: string = (allowanceResult.data) as string;
  console.log(allowanceResult);

  const handleWalletApprove = (price: number) => {

    writeContract({
      ...wagmiERC20Contract,
      functionName: 'approve',
      args: [nftMarket_address, BigInt(price)], // 替换为实际的地址
    });
  }

  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return (
    <div className='mb-1'>
      <h2>用户的Balance</h2>
      <div className='flex item-content'>
        <div className='mr-8'>Balance: {data ? data?.formatted : 0}</div>
        <div>容许使用的金额：{allowance.toString()}</div>
      </div>
      <div className='flex item-content'>
        <input type="text" name="price" placeholder="请输入价格" value={priceValue} onChange={(e) => setPriceValue(Number(e.target.value))} />
        <button onClick={() => handleWalletApprove(priceValue)}>授权可用支付金额</button>
      </div>
    </div>
  )
}