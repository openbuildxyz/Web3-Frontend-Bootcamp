import { mintAction } from '../common/ContractActions'
import { useModal } from 'connectkit'

export default function MintButton({
  minted,
  address,
  isConnected,
}: {
  minted: boolean
  address: `0x${string}` | undefined
  isConnected: boolean
}) {
  const { setOpen } = useModal()
  const handleClick = async () => {
    if (minted) return
    if (!isConnected) {
      setOpen(true)
      return
    }
    await mintAction(address!)
  }
  return (
    <button className='glow-on-hover text-xl' onClick={handleClick}>
      {minted ? 'Minted !' : 'Mint your first Pet3 now !'}
    </button>
  )
}
