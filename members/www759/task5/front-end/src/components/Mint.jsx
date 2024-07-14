import { useRef, useState } from "react";
import { pinFileToIPFS, pinJSONToIPFS } from "../utils/ipfs";
import { fnftAbi } from "../abi/nftAbi";
import { ethers } from "ethers";
import { useEthers } from "./EthersContext";

import '../css/mint.css';

const FNFT_ADDRESS = import.meta.env.VITE_FNFT_ADDRESS;

const Mint = () => {
    const { signer } = useEthers();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [nftAddress, setNftAddress] = useState(FNFT_ADDRESS);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nftAddress) {
            alert('Please select nft');
            return;
        }
        // pinImageToIPFS
        if (!selectedFile) {
            alert('No file selected');
            return
        }

        setIsLoading(true);
        setMessage('');
        setMessageType('');

        let tokenURI = ''
        try {
            // IpfsHash PinSize Timestamp isDuplicate
            const fileRes = await pinFileToIPFS({fileName, file: selectedFile});
            let cid = "ipfs://" + fileRes.IpfsHash;
            
            let metaData = {
                name: title,
                description: description,
                image: cid,
            }
            // IpfsHash PinSize Timestamp
            const jsonRes = await pinJSONToIPFS({json: metaData});
            tokenURI = "ipfs://" + jsonRes.IpfsHash;

            setMessage(`Pin file to ipfs successful, waiting for mint...`)
        } catch(error) {
            setIsLoading(false);
            setMessage(`Pin file to ipfs error: ${error.message}`)
            setMessageType('error');
            return
        }

        try{
            // Mint
            const nftWriter = new ethers.Contract(nftAddress, fnftAbi, signer);
            let address = await signer.getAddress();
            
            let tx = await nftWriter.safeMint(address, tokenURI);
            console.log("tx", tx)
            await tx.wait()

            setIsLoading(false);
            setMessage(`Mint successfule! ${tx.hash}`)
            setMessageType('success');
        } catch(error) {
            setIsLoading(false);
            setMessage(`Mint error: ${error.message}`)
            setMessageType('error')
        }

    }

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setSelectedFile(e.target.files[0]);
        } else {
            setFileName('');
        }
    }

    return (
    <div className="main-container">
    <div className="mint">
        <h1>Upload Image to IPFS and Mint NFT</h1>
        <label htmlFor="nftAddress">NFT Address</label>
        <input
            type="text"
            id="nftAddress"
            placeholder="Enter NFT Address"
            value={nftAddress}
            onChange={e => setNftAddress(e.target.value)}
            required
        ></input>
        <form className="upload-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input 
                type="text"
                id="title"
                placeholder="Enter image title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            ></input>
            <br></br>

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Describe your image"
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
            <br></br>

            
            <div className="input-imageFile">
                <label htmlFor="file">Image</label>
                <button type="button" onClick={() => fileInputRef.current.click()}>选择文件</button>
                <span className="file-name">{fileName || "未选择任何文件"}</span>
                <input
                    type="file"
                    id="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    required
                ></input>
            </div>

            <div className="buttons">
                <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                >Cancle</button>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                >{isLoading? 'Minting...' : 'Mint'}</button>
            </div>
        </form>
        {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
    </div>
    )
}

export default Mint;