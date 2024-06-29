import {useAccount} from "wagmi";

export function useIsConnected() {
    const account = useAccount()
    return !!account.address
}