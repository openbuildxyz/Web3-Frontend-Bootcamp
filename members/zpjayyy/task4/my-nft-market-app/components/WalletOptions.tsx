import { Connector, useConnect } from "wagmi";
import { useEffect, useState } from "react";

export default function WalletOptions() {
  const { connectors, connect } = useConnect();
  return (
    <div>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.id}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="bg-amber-500 border-2 border-gray-200"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </button>
  );
}
