"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="row">
      <div className="inline">
        {ensAvatar ? (
          <img alt="ENS Avatar" className="avatar" src={ensAvatar} />
        ) : (
          <div className="avatar" />
        )}
        <div className="stack">
          {address && (
            <div className="text">
              钱包地址： {ensName ? `${ensName} (${address})` : address}
            </div>
          )}
          <div className=" text-green-400 my-2">
            Connected to {connector?.name} successfully!
          </div>
        </div>
      </div>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={() => disconnect()}
        type="button"
      >
        Disconnect
      </button>
    </div>
  );
}
