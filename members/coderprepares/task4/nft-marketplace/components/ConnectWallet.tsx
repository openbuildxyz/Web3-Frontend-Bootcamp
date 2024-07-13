// components/ConnectWallet.tsx
"use client";

import { config } from '@/lib/config';
import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { switchChain } from 'wagmi/actions';
import { sepolia } from 'wagmi/chains';

export default function ConnectWallet() {
    const { address, isConnected, chainId } = useAccount();
    const { connect, connectors, error } = useConnect();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        if (isConnected && chainId !== sepolia.id) {
            switchChain(config, { chainId: sepolia.id });
        }
    }, [chainId, isConnected]);

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Connect Wallet</h2>
            {isConnected && (
                <>
                    <p className="text-green-500 mb-2">Connected to {address}</p>
                    <button onClick={() => disconnect()} className="btn">
                        Disconnect
                    </button>
                </>
            )}

            {!isConnected && connectors.map((connector) => (
                <>
                    <button
                        key={connector.id}
                        onClick={() => connect({ chainId: sepolia.id, connector })}
                        className="btn mr-2"
                    >
                        {connector.name}
                    </button>
                </>
            ))}

            {error && <div className="text-red-500">{error.message}</div>}
        </div>
    );
}
