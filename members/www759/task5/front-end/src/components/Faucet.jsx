import { useEffect, useState } from "react";
import { useEthers } from "./EthersContext";
import { Contract, ZeroAddress, isAddress } from "ethers";
import { faucetAbi } from "../abi/faucetAbi";
import "../css/faucet.css"

const FAUCET_ADDRESS = import.meta.env.VITE_FAUCET_ADDRESS;

const Faucet = ({updateBalance}) => {
    const [address, setAddress] = useState('');
    const {signer} = useEthers();
    const [faucet, setFaucet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (signer) {
            const _faucet = new Contract(FAUCET_ADDRESS, faucetAbi, signer);
            setFaucet(_faucet);
        }
    }, [signer])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!isValidAddress(address)) {
            alert("The input address is invalid");
            return;
        }
        
        setLoading(true);
        setSuccess(false);
        try{
            let tx = await faucet.requestTokens(address);
            await tx.wait();
            setSuccess(true);

            updateBalance();
        } catch(error) {
            alert(`Get tokens failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    function isValidAddress(address) {
        const isValid = isAddress(address);
        const isNotZeroAddress = address !== ZeroAddress;
        return isValid && isNotZeroAddress;
    }

    return (
        <div className="faucet">
            <h1>FT Token Faucet</h1>
            <p>You can request 100 tokens every day!</p>
            <form className="faucet-form" onSubmit={handleSubmit}>
                <label htmlFor="request-address"></label>
                <input type="text" id="request-address" placeholder="input the request address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                <button type="submit" className="faucet-button" disabled={loading}>
                    {loading? "Getting Tokens..." : "Get Tokens!"}
                </button>
            </form>
            {success && <p className="success-message">Tokens successfully requested!</p>}
        </div>
    )
}

export default Faucet;