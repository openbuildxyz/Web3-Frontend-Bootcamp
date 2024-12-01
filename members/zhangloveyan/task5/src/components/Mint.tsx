import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import abi from '../abi';
import { PicList, ShouHuNFT } from '../constant'

function Mint() {
    const { address, isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract();
    
    const { data: currentTokenId } = useReadContract(
        {
            abi: abi.ShouHuNFT,
            address: ShouHuNFT,
            functionName: 'totalSupply'
        }
    ) as { data: number }
    const mint = () => {

        if (!isConnected) {
            console.log('请先连接钱包');
        }
        writeContractAsync({
            abi: abi.ShouHuNFT,
            address: ShouHuNFT,
            functionName: 'mint',
            args: [address, PicList[currentTokenId]]
        }).then(res => {
            console.log('mint success', res);
        }).catch(error => {
            console.log('mint fail', error.message);
        });
    }

    return (
        <div>
            <button onClick={mint}>mintbutton</button>
        </div>
    );
}

export default Mint;
