import type { PropsWithChildren } from 'react'
import {
  MetaMask,
  WagmiWeb3ConfigProvider,
} from '@ant-design/web3-wagmi';
import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  }
});

function Container(props: PropsWithChildren) {

  return (
    <WagmiWeb3ConfigProvider
    config={config}
    chains={[sepolia]}
    wallets={[MetaMask()]}
    eip6963={{ autoAddInjectedWallets: true }}
    >  
    {props.children}    

    </WagmiWeb3ConfigProvider>
  );
};

export default Container