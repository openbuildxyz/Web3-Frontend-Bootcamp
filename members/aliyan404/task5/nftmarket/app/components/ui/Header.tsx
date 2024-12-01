import { useBalance } from 'wagmi'
import { Button } from '@/components/ui/button'
import { formatEther } from 'viem'
import { obtService } from '@/app/service'
import useSWR from 'swr'
import { MarketContractAddr } from '@/app/utils/contractAddr'

export default function Header({ address }: { address: any }) {
  const { data: ETH } = useBalance({ address: address })
  const { data: OBT } = useSWR(['OBTbalance', address], async () => {
    return await obtService.balanceOf(address)
  })

  const handleMintOBT = () => {
    try {
      obtService.mintOBT(address)
    } catch (error: any) {
      alert('mint error')
    }
  }

  const handleApproveOBT = () => {
    try {
      obtService.approve(MarketContractAddr, BigInt(10))
    } catch (error: any) {
      alert('approve error')
    }
  }

  return (
    <div className="flex justify-between  bg-slate-500 rounded-lg shadow-md">
      <div className="p-4">
        <div>用户: {address}</div>
        <br />
        <div>
          ETC余额: {ETH?.value !== undefined && formatEther(ETH?.value)}
        </div>
        <br />
        <div>OBT余额: {OBT?.toString()}</div>
      </div>
      <div className="pt-24">
        <Button onClick={handleMintOBT}>mint OBT</Button>
        <Button onClick={handleApproveOBT} className='ml-4'>approve 10 OBT</Button>
      </div>
    </div>
  )
}
