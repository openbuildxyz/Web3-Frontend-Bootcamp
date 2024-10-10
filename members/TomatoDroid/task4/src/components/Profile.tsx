import { useAccount, useReadContract } from "wagmi"
import { TOMATO_NFT_ADDRESS, TOMATO_TOKEN_ADDRESS, TomatoNFTABI, TomatoTokenABI } from "../abi"
import { formatUnits } from "viem"

export const Profile = () => {
    const { address } = useAccount()
    const { data: balance, error, status } = useReadContract({ 
        abi: TomatoTokenABI,
        functionName: 'balanceOf',
        args: [address!],
        address: TOMATO_TOKEN_ADDRESS
    })
    const { data: nftBalance, error: nftError, status: nftStatus } = useReadContract({
        abi: TomatoNFTABI,
        functionName: 'balanceOf',
        args: [address!],
        address: TOMATO_NFT_ADDRESS
    })

    
    function balanceOf() {
        if (status === 'pending') return <div>Loading balance</div>
        if (status === 'error')
            return <div>Error balance: {error.message}</div>
        return <div>balance: {formatUnits(balance, 9)} TAT</div>
    }
    function balanceOfNFT() {
        if (nftStatus === 'pending') return <div>Loading balanceNFT</div>
        if (nftStatus === 'error')
            return <div>Error balanceOfNFT: {nftError.message}</div>
        return <div>NFT of number: {nftBalance.toString()}</div>
    }
    
    return (
        <div>
            {balanceOf()}
            {balanceOfNFT()}
        </div>
    )
}

export default Profile