import {useReadContract} from "wagmi";
import {BryanMarket} from "./contracts";

export function NFTBoard() {
    const allListings = useReadContract({
        ...BryanMarket,
        functionName: 'getAllListings',
        args: []
    })

    if (allListings.status === 'pending') {
        return <div>Loading...</div>
    } else if (allListings.status === 'error') {
        console.log('getAllListings error:', allListings.error)

        return <div>Error: {allListings.error.message}</div>
    }

    console.log('allListings:', allListings.data)

    return <div>TODO ({allListings.data.length} NFTs fetched)</div>
}