import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./Tabbar.module.css";
import { useAccount, useWriteContract, } from 'wagmi'
import { getNftFuncVars, NFT_ADDR, getExchangeFuncVars, EXCHANGE_ADDR } from '../abis/contract';
import Dialog from './Dialog';
import { useEffect, useState } from 'react';
import { parseUnits } from 'viem'

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDZyBOQMBQg-05FCwfJl4ZruxXE8m-tra2qQ&s
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnwk-qMYGfLUV1sd5ucfR0KrdLsENE7uGu2Q&s

const Tabbar = () => {
    const account = useAccount();
    const { writeContractAsync } = useWriteContract();
    const [show, setShow] = useState(false);
    const [tokenId, setTokenId] = useState('');
    const [price, setPrice] = useState('');
    const [tokenUrl, setTokenUrl] = useState('');
    const handleMint = async () => {
        if (!account.address) {
            return alert('Please connect wallet first.')
        }
        try {
            const res = await writeContractAsync(getNftFuncVars("_mint", [account.address]));
            console.log(res);
            alert("mint success.");
        } catch (error: any) {
            alert(error.message);
        }


    }
    const handleSell = () => {
        console.log('in');
        setShow(true);
    }
    const onSubmit = async () => {
        console.log(tokenId, price);
        const loadingDiv = document.getElementById("loading") as HTMLElement;
        if (price === '' || tokenId === '') {
            alert('Please input token id and price.');
            return;
        }
        if (price == '0') {
            alert('Price cannot be 0.');
            return;
        }
        try {
            loadingDiv.style.display = "flex";
            await writeContractAsync(getNftFuncVars('setApprovalForAll', [EXCHANGE_ADDR, true]));
            const res = await writeContractAsync(getExchangeFuncVars('ListingNFT', [NFT_ADDR, tokenId, parseUnits(`${price}`, 6), tokenUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbQVaIhkSuOxnbmCY29cUnTwwuRYVdkHCU8Q&s']));
            console.log('sell success: ', res);
            alert('sell success ~ ! please refresh the page to see the changes later.');
            setShow(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            loadingDiv.style.display = "none";
        }
    }
    return (
        <>
            <div className={styles.tabbar}>
                <div className="ca-btn" onClick={handleMint}>mint</div>
                <div className="ca-btn" onClick={() => handleSell()}>listNFT</div>
                <div style={{ marginLeft: "10px" }}>
                    <ConnectButton label="connect wallet" />
                </div>
            </div>
            <Dialog show={show} title="List NFT" onClose={() => setShow(false)} onSubmit={onSubmit}>
                <div className='ca-form-item'>
                    <div className="ca-label">Contract:</div>
                    <div className='ca-value'>{NFT_ADDR}</div>
                </div>
                <div className='ca-form-item'>
                    <div className="ca-label">Token ID:</div>
                    <div className='ca-value'>
                        <input type="text" placeholder='input token id' value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                    </div>
                </div>
                <div className='ca-form-item'>
                    <div className="ca-label">price</div>
                    <div className='ca-value'>
                        <input type="text" placeholder='input price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className='ca-form-item'>
                    <div className="ca-label">photo url</div>
                    <div className='ca-value'>
                        <input type="text" placeholder='photo url' value={tokenUrl} onChange={(e) => setTokenUrl(e.target.value)} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default Tabbar;