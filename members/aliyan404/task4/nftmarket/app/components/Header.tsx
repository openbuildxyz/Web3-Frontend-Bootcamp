import { useBalance} from 'wagmi'
import { NFTEXContractAddr} from '../utils/contractAddr'
import { Button } from '@/components/ui/button'
import { useOBTBalance } from '../utils/readContracts'
import { formatEther } from 'viem'
import { useApproveOBT, useMintOBT } from '../utils/writeContracts'

export default function Header({ address }: { address: any }) {
  const { data: ETH } = useBalance({ address: address })
  const { data: OBT } = useOBTBalance(address)

  const mintOBT = useMintOBT()
  const handleMintOBT = () => {
    mintOBT(BigInt(10))
  }

  const approveOBT = useApproveOBT()
  const handleApproveOBT = () => {
    approveOBT(NFTEXContractAddr, BigInt(10))
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
        <Button onClick={handleApproveOBT}>approve 10 OBT</Button>
      </div>
    </div>
  )
}
