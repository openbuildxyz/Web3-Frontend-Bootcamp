import * as React from 'react';
import { Connector, useChainId, useConnect } from 'wagmi';

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  return (
    <div className="container">
      <div className="set">
        {connectors.map((connector) => (
          <ConnectorButton
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector, chainId })}
          />
        ))}
      </div>
    </div>
  );
}

function ConnectorButton({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector, setReady]);

  return (
    <button disabled={!ready} onClick={onClick} type="button">
      {connector.name}
    </button>
  );
}
