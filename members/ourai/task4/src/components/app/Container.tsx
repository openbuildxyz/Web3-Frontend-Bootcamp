import type { PropsWithChildren } from 'react'
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Sepolia } from '@ant-design/web3-wagmi'

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  }
})

function Container(props: PropsWithChildren) {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      chains={[Sepolia]}
      wallets={[MetaMask(), OkxWallet()]}
      eip6963={{ autoAddInjectedWallets: true }}
    >
      {props.children}
    </WagmiWeb3ConfigProvider>
  )
}

export default Container
