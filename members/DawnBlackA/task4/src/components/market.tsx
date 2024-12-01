import { useReadContract, useWriteContract } from "wagmi";
import { marketAbi } from "../../abis/market";
import { nftAbi } from "../../abis/nft";
import { useState } from "react";
import { erc20Abi } from "viem";
import { ethers } from 'ethers';

const marketAddress = '0xfffdb34db968B2ea6ba0975cF64985890d25F10f';
// const marketAddress = '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d';

const ERC20Address = '0x638a441770C5484Bf0125CA7a1af30E802022ee1';
// const ERC20Address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


function Upload() {
    
    const {writeContract} = useWriteContract();
    const [tokenId,setTokenId] = useState('');
    const [price,setPrice] = useState('');
    const [NFTAddress,setNFTAddress] = useState('0x0');

    const [isLoading,setIsLoading] = useState(false);

    // function handleApprove() {

    //     const _tokenId = BigInt(tokenId)

    //     writeContract({
    //         abi: nftAbi,
    //         address: NFTAddress,
    //         functionName: 'approve',
    //         args: [marketAddress,_tokenId],
    //     })
        
    // }

    function handleUpload() {

        const _tokenId = BigInt(tokenId);
        const _price = BigInt(price);

        if(!NFTAddress) return;
        writeContract({
            abi: nftAbi,
            address: NFTAddress,
            functionName: 'approve',
            args: [marketAddress,_tokenId],
            // onMutate: () => {
            //     setIsLoading(true);
            // },
            // onSuccess: () => {
            //     setIsLoading(false);
            // },
            // onError: () => {
            //     setIsLoading(false);
            // },
        })
        
        writeContract({
            abi: marketAbi,
            address: marketAddress,
            functionName: 'upload',
            args: [_tokenId,_price,NFTAddress],
            // onMutate: () => {
            //     setIsLoading(true);
            // },
            // onSuccess: () => {
            //     setIsLoading(false);
            // },
            // onError: () => {
            //     setIsLoading(false);
            // },
        })
    }


    return (
        <div>
            <h1>UPLOAD</h1>
            <input
                type="text"
                placeholder='Enter TokenId'
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
            />
            <input
                type="text"
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder='Enter NFTAddress'
                value={NFTAddress}
                onChange={(e) => setNFTAddress(e.target.value)}
            />
            <button onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}

function NFTList() {
    
    const {writeContract} = useWriteContract();
    // const {readContract} = useReadContract();

    type NFT = {
        NFTId: bigint;
        TokenId: bigint;
        Address: '0x${string}';
        Owner: '0x${string}';
        Price: bigint;
        TokenURI: '';
        InSelling: boolean;
    }

    const [NFTdata,setNFTdata] = useState(null);

    // const [NFTs,setNFTs] = useState<NFT[]>([]);
    // const [NFTsInSelling,setNFTsInSelling] = useState<NFT[]>([]);
    // const [error,setError] = useState(null);
    // const [loading,setLoading] = useState(true);

    // const [NFTId,setNFTId] = useState('');
    // const [price,setPrice] = useState('');
    // const[uploadCount,setuploadCount] = useState(0);
    
    // setNFTs(useReadContract({
    //     abi: marketAbi,
    //     address: marketAddress,
    //     functionName: 'getAllNFTs',
    //     args: [],
    // }))

    const {data: NFTsData} = useReadContract({
        abi: marketAbi,
        address: marketAddress,
        functionName: 'getAllNFTs',
        args: [],
    })

    const NFTs = (NFTsData || []);

    function handleDownload(NFTId) {
        const _NFTId = BigInt(NFTId);
        writeContract({
            abi: marketAbi,
            address: marketAddress,
            functionName: 'download',
            args: [_NFTId],
        })
    }
    function handleBuy(NFTId,price) {
        handleApprove(price);
        const _NFTId = BigInt(NFTId);
        writeContract({
            abi: marketAbi,
            address: marketAddress,
            functionName: 'buy',
            args: [_NFTId],
        })
    }
    function handleApprove(_price) {
        // const _price = BigInt(price);
        writeContract({
            abi: erc20Abi,
            address: ERC20Address,
            functionName: 'approve',
            args: [marketAddress,_price],
        })
    }

    function fetchNFT(tokenURI) {
        const response = fetch(tokenURI);
        const data = response.json();
        setNFTdata(data);
    }

    const NFTsInSelling = NFTs.filter(NFT => NFT.InSelling);
    return (
        // <div>
        //     {/* <button onClick={handleNFTList}>NFTList</button> */}
        //     {/* <h1>{uploadCount}</h1> */}
        // </div>
        <div>
                 <ul>
                 {NFTsInSelling.map((NFT,index) => (
                            <li key ={index}>
                                <p>NFTID: {index}</p>
                                <p>TokenID: {Number(NFT.TokenId)}</p>
                                <p>Address: {NFT.Address}</p>
                                <p>Owner: {NFT.Owner}</p>
                                <p>Price: {Number(NFT.Price)}</p>
                                <p>InSelling: {NFT.InSelling.toString()}</p>
                                <p>URI: {NFT.TokenURI}</p>
                                {/* fetchNFT(NFT.TokenURI)
                                <img src = {NFTdata.image} /> */}
                                <button onClick={() => handleBuy(index,NFT.Price)}>Buy</button>
                                <button onClick={() => handleDownload(index)}>DownLoad</button>
                            </li>
                        ))}
                    </ul>
                </div>
    )
}

// function handleNFTList() {

//     // const [uploadCount,setuploadCount] = useState(0);

//     const uploadCountData = useReadContract({
//         abi: marketAbi,
//         address: marketAddress,
//         functionName: 'getUploadCount',
//         args: [],
//     })
//     const uploadCount = Number(uploadCountData);
//     const NFTs = [];
//     for (let i = 0;i < uploadCount;i++) {
//         const _NFTId = BigInt(i);
//         const tokenId = useReadContract({
//             abi: marketAbi,
//             address: marketAddress,
//             functionName: 'getNFTokenId',
//             args: [_NFTId],
//         })

//         const NFTAddress = useReadContract({
//             abi: marketAbi,
//             address: marketAddress,
//             functionName: 'getNFTAddress',
//             args: [_NFTId],
//         })

//         const NFTOwner = useReadContract({
//             abi: marketAbi,
//             address: marketAddress,
//             functionName: 'getOwner',
//             args: [_NFTId],
//         })

//         const NFTPrice = useReadContract({
//             abi: marketAbi,
//             address: marketAddress,
//             functionName: 'getPrice',
//             args: [_NFTId],
//         })

//         const NFTInSelling = useReadContract({
//             abi: marketAbi,
//             address: marketAddress,
//             functionName: 'getInSelling',
//             args: [_NFTId],
//         })
//         NFTs.push({id: tokenId,address: NFTAddress,owner: NFTOwner,price: NFTPrice,inSelling: NFTInSelling});
//     }
//     return (
//         <div>
//             <ul>
//                 {NFTs.map((NFT,index) => (
//                     <li key ={index}>
//                         <p>TokenID: {NFT.id}</p>
//                         <p>Address: {NFT.address}</p>
//                         <p>Owner: {NFT.owner}</p>
//                         <p>Price: {NFT.price}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

function ReadContract() {
    const { data: balance } = useReadContract({
      abi: marketAbi,
      address: marketAddress,
      functionName: 'getUploadCount',
    })
  
    return (
      <div>Balance: {balance?.toString()}</div>
    )
  }

export {Upload,NFTList,ReadContract};