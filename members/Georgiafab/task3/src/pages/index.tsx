import { ethers } from "ethers";
import { useState } from "react";
import { Input, Button } from 'antd';
import ERC721Token from "@contracts/ERC721Token.sol/ERC721Token.json";

export default function Home() {
    const [tokenId, setTokenId] = useState<string>("");
    const [mintTo, setMintTo] = useState<string>("");


    const getContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        let token = new ethers.Contract(
            "0x6F817c5d3ccd451fd38B4cB77E78d85FD1F0810d",
            ERC721Token.abi,
            signer
        );
        return { token, signer };
    };

    const mintNft = async () => {
        const { token, signer } = await getContract();
        await token.connect(signer).mint(mintTo, tokenId);
    };

    // const getMintList = async () => {
    //     const { token, signer } = await getContract();
    //     try {
    //         let arr = await token.connect(signer).ownedTokens();
    //         // setProposalName({ name, total });
    //         console.log(arr, 'arr')
    //     } catch (error) {
    //         alert(error);
    //     }
    // }
    return (
        <div>
            <div className="w-80 rounded">

                {/* <Input /> */}
                <Input placeholder=" to " value={mintTo} onChange={e => setMintTo(e.target.value)} />
                <Input placeholder=" tokenid " value={tokenId} onChange={e => setTokenId(e.target.value)} />
                <Button type="primary" onClick={mintNft}>mint NFT</Button>
                {/* <Button type="primary" onClick={getMintList}>get my NFT</Button> */}
            </div>
        </div>
    )
}




