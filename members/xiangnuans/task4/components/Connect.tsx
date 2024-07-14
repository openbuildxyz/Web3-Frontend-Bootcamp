"use client";

import * as React from "react";

import { Connector, useChainId, useConnect } from "wagmi";

export function Connect() {
  // const chainId = useChainId();
  const { connectors, connect } = useConnect();

  return (
    <div className=" flex justify-end">
      {connectors.map((connector) => {
        if (connector.name !== "MetaMask") return;
        return (
          <ConnectorButton
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        );
      })}
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
      <img src={connector.icon} alt="wallet icon" />
      <div className=" my-2">{connector.name}</div>
    </button>
  );
}
