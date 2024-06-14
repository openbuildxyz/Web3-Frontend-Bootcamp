import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName();
  const { data: ensAvatar } = useEnsAvatar();

  return (
    <div>
      {ensAvatar && <img alt="ens avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
