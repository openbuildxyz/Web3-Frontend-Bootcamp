import { useReadContract } from 'wagmi'
import ClaimButton from './ClaimButton'
import Score from './Score'
import { Pet3Abi } from '../abi/Pet3'
import { CONTRACT_ADDRESS } from '../common/const'

export default function ScoreContent({
  address,
}: {
  address: `0x${string}` | undefined
}) {
  const { status, data } = useReadContract({
    abi: Pet3Abi,
    address: CONTRACT_ADDRESS,
    functionName: 'getTokenId',
    args: [address],
  })
  if (status === 'pending') {
    return <div>Loading...</div>
  }
  return <Content tokenId={data as number}></Content>
}

function Content({ tokenId }: { tokenId: number }) {
  const { data } = useReadContract({
    abi: Pet3Abi,
    address: CONTRACT_ADDRESS,
    functionName: 'getScore',
    args: [tokenId],
  })
  console.log(111, data)
  return (
    <>
      <Score score={Number(data)}></Score>
      <div className='mt-[30px] flex justify-center'>
        <ClaimButton tokenId={tokenId}></ClaimButton>
      </div>
    </>
  )
}
