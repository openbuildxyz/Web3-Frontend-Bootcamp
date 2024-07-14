import {useIsConnected} from "./hooks/useIsConnected.tsx";
import {useAccount, useReadContract} from "wagmi";
import {BryanCoin} from "./contracts";

export type Props = {
    className?: string
}

export function BRCBalance(props: Props) {
    const connected = useIsConnected();
    if (!connected) {
        return null;
    }

    return <RealBalance {...props}/>
}

function RealBalance({className}: Props) {
    const {address} = useAccount()
    const balance = useReadContract({
        ...BryanCoin,
        functionName: 'balanceOf',
        args: [address!]
    })

    if (balance.data === undefined) {
        return null;
    }

    return (
        <div className={className}>BRC${balance.data.toString()}</div>
    )
}