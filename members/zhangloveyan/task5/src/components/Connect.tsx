import * as React from 'react';
import { useChainId, useConnect } from 'wagmi';

export function Connect() {
    const chainId = useChainId();
    const { connectors, connect } = useConnect();
    console.log("connectors", connectors);

    return (
        <div>
            {connectors.map((connector => (
                <ConnectorButton
                    key={connector.uid}
                    connector={connector}
                    onClick={() => connect({ connector, chainId })}
                />
            )))}

        </div>
    )
}

function ConnectorButton({ connector, onClick, }) {
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            const provider = await connector.getProvider();
            setReady(!!provider);
        })();
    }, [connector, setReady]);

    return (
        <button
            disabled={!ready}
            onClick={onClick}
            type='button'>
            {connector.name}
        </button>
    )
}