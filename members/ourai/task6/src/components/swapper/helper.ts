import { ChainId, Token, WETH9 } from '@uniswap/sdk-core'

import type { CryptoValue } from './typing'

function isCryptoValid(crypto: CryptoValue, amountRequired = false): boolean {
  const valid = !!(crypto && crypto.token)

  return valid && amountRequired === true ? !!crypto!.inputString : valid
}

function resolveEthAddress(symbol: string, chainId: number): string {
  return symbol === 'ETH' ? WETH9[chainId].address : ''
}

function resolveTokenAddress(crypto: CryptoValue, chainId: number): string {
  if (!crypto || !crypto.token || !chainId) {
    return ''
  }

  const found = crypto.token.availableChains.find(({ chain }) => chain.id === chainId)

  if (found) {
    return found.contract || chainId === ChainId.MAINNET && resolveEthAddress(crypto.token.symbol, chainId) || ''
  }

  return ''
}

function resolveUniswapToken(crypto: CryptoValue, chainId: number): Token | null {
  const addr = resolveTokenAddress(crypto, chainId)

  if (!addr) {
    return null
  }

  const { decimal, symbol, name } = crypto!.token!

  return new Token(chainId, addr, decimal as number, symbol, name)
}

function resolveValidUniswapTokens(pair: CryptoValue[], chainId: number): Token[] {
  return pair.map(crypto => resolveUniswapToken(crypto, chainId)).filter(token => !!token) as Token[]
}

export { isCryptoValid, resolveValidUniswapTokens }
