// lib/getEthersProvider.ts
import { FallbackProvider, JsonRpcProvider } from 'ethers';
import type { Client, Chain, Transport } from 'viem';
import { type Config, getClient } from '@wagmi/core';

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Client to an ethers.js Provider. */
export const getEthersProvider = (
  config: Config,
  { chainId }: { chainId?: number } = {},
) => {
  const client = getClient(config, { chainId });
  if (!client) return;
  return clientToProvider(client);
}
