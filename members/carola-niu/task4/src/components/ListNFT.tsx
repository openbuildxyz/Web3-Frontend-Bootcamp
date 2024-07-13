import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import NFTMarketABI from "../contracts/NFTMarketABI.json";
import { parseAbi } from "viem";
import { hashUrl, MyNFTAddress, NFTMarketAddress } from "../config";


const ERC721_ABI = parseAbi(["function approve(address to, uint256 tokenId) external"]);

function ListNFT() {
    const [nftAddress, setNftAddress] = useState<`0x${string}`>(MyNFTAddress);
    const [tokenId, setTokenId] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [tokenUrl, setTokenUrl] = useState<string>("");
    const { data: hash, writeContractAsync, isPending } = useWriteContract();
    const { data: hashList, writeContractAsync: writeContractAsyncList, isPending: isPendingList } = useWriteContract();

    const approve = async () => {
        return await writeContractAsync({
            address: nftAddress,
            abi: ERC721_ABI,
            functionName: "approve",
            args: [NFTMarketAddress, tokenId as any],
        });
    };

    const listItem = async () => {
        await writeContractAsyncList({
            address: NFTMarketAddress,
            abi: NFTMarketABI,
            functionName: "ListingNFT",
            args: [nftAddress, tokenId, tokenUrl, price],
        });
    };

    async function listNFT() {
        await approve();
        await listItem();
    }

    const listHashUrl = hashUrl + hashList;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(nftAddress).then(() => {
            alert("NFT Contract Address copied to clipboard");
        }, (err) => {
            alert("Failed to copy the address");
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTokenUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="section"style={{ border: "1px solid #ccc", padding: "5px", margin: "5px", width: "45%", height: "400px", float: "right" }}>
            <h2>List NFT</h2>
            <div>
                <label>NFT Contract Address:</label>
                <input type="text" placeholder="NFT Contract Address" value={nftAddress} onChange={(e) => setNftAddress(e.target.value as any)} readOnly />
                <button className="btn-copy" onClick={copyToClipboard}>Copy Address</button>
            </div>
            <div>
                <label>Token ID:</label>
                <input type="text" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
            </div>
            <div>
                <label>NFT Token URL:</label>
                <input type="file" onChange={handleFileChange} />
                {tokenUrl && <img src={tokenUrl} alt="NFT Preview" />}
            </div>
            <div>
                <label>NFT Selling Price:</label>
                <input type="text" placeholder="Price (in ERC20 tokens)" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button className="btn" onClick={listNFT} disabled={isPending}>
                {isPending || isPendingList ? "Listing" : "List NFT"}
            </button>
            {hashList && (
                <div>
                    List NFT successful, please click <a href={listHashUrl}>{hashList}</a> to view the transaction
                </div>
            )}
        </div>
    );
}

export default ListNFT;