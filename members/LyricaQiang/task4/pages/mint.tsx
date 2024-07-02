import { useState } from 'react';
import {useAccount} from "wagmi";
import {getTokenContract, getMarketContract, getNFTContract} from "../util/index"

const Mint = () => {
    const [mintNFTAddress, setMintNFTAddress] = useState('')
    const [mintTokenAddress, setMintTokenAddress] = useState('')

    const account = useAccount()

    const onMintNFT = async ()=> {
        try {
            if(!account.address) {
                window.alert('请连接钱包')
                return
            }       
            const {contract, signer} = await getNFTContract()
            await contract.safeMint(mintNFTAddress)
            window.alert('Mint成功')
            setMintNFTAddress('')
        }catch(e) {
        }
         
    }


     const onMintToken = async ()=> {
         try {

         } catch(e) {
             if(!account.address) {
                window.alert('请连接钱包')
                return
            }       
            const {contract, signer} = await getTokenContract()
            console.log(contract.mint);
            console.log(mintTokenAddress);
            await contract.mint(mintTokenAddress, 10000000000)
            window.alert('Mint成功')
            setMintTokenAddress('')
         }
    }

    return (
        <div>
            <div className="buy-nft padding">
                <input type="text" value={mintTokenAddress} placeholder="Mint token的地址" onChange={(e) => setMintTokenAddress(e.target.value)}/>
                <button className="button" onClick={onMintToken}>Mint Token</button>
            </div>
            <div className="buy-nft padding">
                <input type="text" value={mintNFTAddress} placeholder="Mint NFT的地址" onChange={(e) => setMintNFTAddress(e.target.value)}/>
                <button className="button" onClick={onMintNFT}>Mint NFT</button>
            </div>
        </div>
    );
};

export default Mint;