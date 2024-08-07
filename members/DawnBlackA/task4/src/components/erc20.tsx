import { useState } from "react";
import { erc20Abi } from "../../abis/erc20";
import { useWriteContract } from "wagmi";

function ERC20Mint() {
    const {writeContract} = useWriteContract();
    const [amount,setAmount] = useState('');


    function handleMint() {
        const _amount = BigInt(amount)
        writeContract({
            abi: erc20Abi,
            address: '0x638a441770C5484Bf0125CA7a1af30E802022ee1',
            functionName: 'mint',
            args: [_amount],
        })
    }

    return (
        <div>
            <h1>ERC20mint</h1>
            <input
                type="text"
                placeholder='Enter Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleMint}>mint</button>
        </div>
    )
}
export {ERC20Mint};