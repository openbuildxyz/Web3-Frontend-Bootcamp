import type { PropsWithChildren } from 'react'
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet } from '@ant-design/web3-wagmi'

import { getWagmiConfig, getWagmiChains } from '../../helper'

function Container(props: PropsWithChildren) {
  return (
    <WagmiWeb3ConfigProvider
      config={getWagmiConfig()}
      chains={getWagmiChains()}
      wallets={[MetaMask(), OkxWallet()]}
      eip6963={{ autoAddInjectedWallets: true }}
    >
      {props.children}
    </WagmiWeb3ConfigProvider>
  )
}

export default Container
