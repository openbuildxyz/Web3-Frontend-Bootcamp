import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useBalance } from 'wagmi'
import { formatUnits } from 'viem'
import { ERC20TokenAddr } from './../consts'

export default function Profile({ walletAddr }) {
  return (
    <div className='flex justify-end items-center'>
      <Erc20Balance walletAddr={walletAddr}></Erc20Balance>
      <ConnectButton />
    </div>
  )
}

function Erc20Balance({ walletAddr }) {
  const { data: ercToken, status } = useBalance({
    address: walletAddr,
    token: ERC20TokenAddr,
  })
  if (status !== 'success') {
    return <div></div>
  }
  return (
    <div className='mr-4 shadow-md p-2 rounded-md'>
      {formatUnits(ercToken.value, ercToken.decimals)}{' '}
      <span className='font-bold'>{ercToken.symbol}</span>
    </div>
  )
}
