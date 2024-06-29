import {useReadContract} from "wagmi";
import {BryanMarket} from "./contracts";
import {cn} from "./utils/cn.ts";

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

    return (
        <div className="flex flex-col items-center gap-2">
            {
                allListings.data.map(item =>
                    <NFTItem
                        key={item.nftContract + '/' + item.tokenId.toString()}
                        item={item}
                    />)
            }
        </div>)
}

type NFTItemProps = {
    item: {
        nftContract: `0x${string}`
        tokenId: bigint
        seller: `0x${string}`
        buyer: `0x${string}`
        pricing: bigint
    }
}

function NFTItem({item}: NFTItemProps) {
    const sold = item.buyer !== '0x0000000000000000000000000000000000000000'

    function handleClick() {
        if (sold) return;

        alert("Buy")
    }

    return (
        <div
            className={cn("relative border-2 rounded p-4 flex flex-col items-start", sold ? 'border-gray-400 bg-gray-100' : 'border-indigo-300 bg-indigo-100 cursor-pointer')}
            onClick={handleClick}
        >
            <div>
                <span className="font-bold">NFT 合约地址：</span>
                <span>{item.nftContract}</span>
            </div>
            <div>
                <span className="font-bold">NFT Token ID：</span>
                <span>{item.tokenId.toString()}</span>
            </div>
            <div>
                <span className="font-bold">价格：</span>
                <span>BRC${item.pricing.toString()}</span>
            </div>
            <div>
                <span className="font-bold">卖家：</span>
                <span>{item.seller}</span>
            </div>
            {
                sold && (<div className="absolute bottom-2 right-2 text-4xl opacity-60">已售出</div>)
            }
        </div>
    )
}