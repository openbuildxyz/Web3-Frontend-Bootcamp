import { useAccount, useConnect, useDisconnect } from "wagmi";

function Wallet() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {account.status === "connected" ? (
        <button className="button" type="button" onClick={() => disconnect()}>
          Disconnect {account.addresses?.[0] ?? "-"} of {account.chain?.name}
        </button>
      ) : (
        connectors.map((connector) => (
          <button
            className="button"
            type="button"
            key={connector.uid}
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </button>
        ))
      )}
    </div>
  );
}

export default Wallet;
