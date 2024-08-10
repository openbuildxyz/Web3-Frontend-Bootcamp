import { ClaimAction } from '../common/ContractActions'
import { useChromeStorageLocal } from 'use-chrome-storage'

export default function ClaimButton({ tokenId }: { tokenId: number }) {
  const [value, setValue] = useChromeStorageLocal('score', 0)
  const handleClick = async () => {
    // if (value === 0) return
    await ClaimAction(tokenId, value)
    setValue(0)
    // await waitForTransactionReceipt(config, hash)
  }
  return (
    <button
      className='glow-on-hover text-xl text-red-400'
      onClick={handleClick}
    >
      <span className='text-white'>{value}</span> to Claim
    </button>
  )
}
