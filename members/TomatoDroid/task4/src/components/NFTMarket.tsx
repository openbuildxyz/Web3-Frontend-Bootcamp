import { useReadContracts, type BaseError } from "wagmi"
import { NFTExchangeABI, NFT_EXCHANGE_ADDRESS, TOMATO_NFT_ADDRESS } from '../abi'
import { formatUnits, zeroAddress } from "viem"

export const NFTMarket = () => {
    const { data: listings, error, isLoading } = useReadContracts({
        contracts: [
            {
                abi: NFTExchangeABI,
                functionName: 'listings',
                args: [TOMATO_NFT_ADDRESS, BigInt(2)],
                address: NFT_EXCHANGE_ADDRESS
            },
            {
                abi: NFTExchangeABI,
                functionName: 'listings',
                args: [TOMATO_NFT_ADDRESS, BigInt(3)],
                address: NFT_EXCHANGE_ADDRESS
            },
            {
                abi: NFTExchangeABI,
                functionName: 'listings',
                args: [TOMATO_NFT_ADDRESS, BigInt(4)],
                address: NFT_EXCHANGE_ADDRESS
            },
            {
                abi: NFTExchangeABI,
                functionName: 'listings',
                args: [TOMATO_NFT_ADDRESS, BigInt(5)],
                address: NFT_EXCHANGE_ADDRESS
            },
            {
                abi: NFTExchangeABI,
                functionName: 'listings',
                args: [TOMATO_NFT_ADDRESS, BigInt(6)],
                address: NFT_EXCHANGE_ADDRESS
            },
        ]
    })
    

    if (isLoading) return <div>loading...</div> 

    if (error) {
        return (
            <div>
                 Error: {(error as BaseError).shortMessage || error.message}
            </div>
        )
    }

    return (
        <div>
            <div>NFT Market</div>
            <table className="border border-gray-700 m-b-4">
                <thead className="border-b border-gray-700">
                    <tr>
                        <td className="border-r border-gray-700 text-center">Owner</td>
                        <td className="border-r border-gray-700 text-center">NFTAddress</td>
                        <td className="border-r border-gray-700 text-center">TokenId</td>
                        <td className="border-r border-gray-700 text-center">Price</td>
                        <td className="border-r border-gray-700 text-center">IsActive</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        listings?.map((listing, key) => {
                            if (listing.result?.[0] === zeroAddress) {
                                return null
                            }
                            return (
                                <tr key={key}>
                                    <td className="border-r border-gray-700 text-center">{listing.result?.[0]}</td>
                                    <td className="border-r border-gray-700 text-center">{listing.result?.[1]}</td>
                                    <td className="border-r border-gray-700 text-center">{listing.result?.[2].toString()}</td>
                                    <td className="border-r border-gray-700 text-center">{formatUnits(listing.result![3], 9)}</td>
                                    <td className="border-r border-gray-700 text-center">{listing.result?.[4].toString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}