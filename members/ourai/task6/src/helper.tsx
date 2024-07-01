import { createConfig, http } from 'wagmi'
import { mainnet, sepolia/*, hardhat*/ } from 'wagmi/chains'
import { Mainnet/*, Sepolia, Hardhat*/ } from '@ant-design/web3-wagmi'
import { ETH, USDT, Mainnet as AntdMainnet } from '@ant-design/web3-assets'
import { ShibColorful, UsdcColorful } from '@ant-design/web3-icons'
import type { Token as AntdToken } from '@ant-design/web3'

const SHIB: AntdToken = {
  name: 'Shiba Inu',
  symbol: 'SHIB',
  icon: <ShibColorful />,
  decimal: 18,
  availableChains: [{ chain: AntdMainnet, contract: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce' }],
}

const USDC: AntdToken = {
  name: 'USD Coin',
  symbol: 'USDC',
  icon: <UsdcColorful />,
  decimal: 6,
  availableChains: [{ chain: AntdMainnet, contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }],
}

const TOKEN_LIST = [ETH, SHIB, USDT, USDC]

const ETH_MAINNET_UNISWAP_V2_ROUTER_CONTRACT = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY

const etherscanApiUrlMap: Record<number, string> = {
  [mainnet.id]: mainnet.blockExplorers.default.apiUrl,
  [sepolia.id]: sepolia.blockExplorers.default.apiUrl,
}

const config = createConfig({
  chains: [mainnet/*, sepolia, hardhat*/],
  transports: {
    [mainnet.id]: http(),
    // [sepolia.id]: http(),
    // [hardhat.id]: http(),
  }
})

function getWagmiConfig() {
  return config
}

function getWagmiChains() {
  return [Mainnet/*, Sepolia, Hardhat*/]
}

function getEtherscanApiUrl(chainId: number): string {
  return etherscanApiUrlMap[chainId] || ''
}

export { TOKEN_LIST, ETH_MAINNET_UNISWAP_V2_ROUTER_CONTRACT, ETHERSCAN_API_KEY, getWagmiConfig, getWagmiChains, getEtherscanApiUrl }
