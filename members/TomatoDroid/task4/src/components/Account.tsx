import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi"

export const Account = () => {
    const { address, connector } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div className="flex items-center gap-3">
            { ensAvatar && <img className="border border-gray-700 rounded-full w-20 h-20" alt="ENS Avator" src={ensAvatar}></img> }
            <div>
                { address && <div className="">{ ensName ? `${ensName} (${address})` : address}</div> }
                <div className="">Connector: { connector?.name } </div>
            </div>
            <button
                className="w-30 h-10 btn-base bg-red-500"
                onClick={() => disconnect()}
            >
                disconnect
            </button>
        </div>
    )
}