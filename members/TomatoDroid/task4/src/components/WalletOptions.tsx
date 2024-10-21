import { useEffect, useState } from "react"
import { Connector, useConnect } from "wagmi"

export const WalletOptions = () => {
    const { connectors, connect } = useConnect()

    return (
        <div className="flex items-center gap-2">
            {
                connectors.map(connector => (
                    <WalletOption
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        connector={connector}
                    />
                ))
            }
        </div>
    )
}

function WalletOption(
    { connector, onClick }:
    {
        connector: Connector,
        onClick: ()=> void
    }    
) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        (async() => {
        const provider = await connector.getProvider()
        setReady(!!provider)
        })()
    }, [connector])

    return (
        <button
            className="w-30 h-10 btn-base"
            onClick={onClick}
            disabled={!ready}
        >
            {connector.name}
        </button>
    )
}