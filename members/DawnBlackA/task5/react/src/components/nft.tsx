import { useAccount, useWriteContract } from 'wagmi'
import { nftAbi } from '../../abis/nft'
import { useState } from 'react';

function NFTMint() {

    const [tokenId,setTokenId] = useState('');
    const [baseTokenURL,setBaseTokenURL] = useState('');
    const { writeContract } = useWriteContract();
    const {address} = useAccount();

    function handleMint() {
        const _tokenId = BigInt(tokenId);
        writeContract({
            abi: nftAbi,
            address: '0xcf7bedda290c41865abbd535e85d601a94602880',
            // address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            functionName: 'mint',
            args: [_tokenId,baseTokenURL],
        })
    }

    return (
        <div>
            <h1>NFTmint</h1>
            <input
                type="text"
                placeholder='Enter TokenId'
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
            />
            <input
                type="text"
                placeholder='Enter Base Token URL'
                value={baseTokenURL}
                onChange={(e) => setBaseTokenURL(e.target.value)}
            />
            <button onClick={handleMint}>mint</button>
        </div>
    )
}

// function NFTApprove() {

//     const [tokenId,setTokenId] = useState('');
//     const [marketAddress,setMarketAddress] = useState('');
//     const {writeContract} = useWriteContract();

//     function handleApprove() {
//         const _tokenId = BigInt(tokenId);
//         if(!marketAddress) return;
//         writeContract({
//             abi: nftAbi,
//             address: '0xcf7bedda290c41865abbd535e85d601a94602880',
//             functionName: 'approve',
//             args: [marketAddress,_tokenId],
//         })
//     }
//     return (
//         <div>
//             <h1>Approve</h1>
//             <input
//                 type="text"
//                 placeholder='Enter TokenId'
//                 value={tokenId}
//                 onChange={(e) => setTokenId(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder='Enter Base Token URL'
//                 value={marketAddress}
//                 onChange={(e) => setMarketAddress(e.target.value)}
//             />
//             <button onClick={handleApprove}>Approve</button>
//         </div>
//     )

// }
export {NFTMint}