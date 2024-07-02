import { useEffect, useState } from 'react';
import { sepolia } from 'wagmi/chains'
import {useAccount, useSwitchChain} from 'wagmi';

export default function NetworkDetect() {
    const [isSwitching, setIsSwitching] = useState<boolean>(false);
    const [needSwitch, setNeedSwitch] = useState<boolean>(false);
    
    const { chainId: curChainId } = useAccount();
    const { switchChainAsync } = useSwitchChain();
    useEffect(() => {
        setNeedSwitch(curChainId !== sepolia.id);
    }, [])
    
    return (
        <>
            {!isSwitching && (needSwitch ? 
                (<a href='#' title="You Are Not in Sepolia"><button 
                    className="border-2 text-red-500 rounded-md text-xs p-2 m-2 border-stone-700 hover:bg-gray-300"
                    onClick={async () => {
                        try {
                            setIsSwitching(true);
                            await switchChainAsync({ chainId: sepolia.id });
                        } catch(error) {
                            console.error('can\'t switch network: ', error);
                        } finally {
                            setIsSwitching(false);
                        }
                }}>Switch Network</button></a>) 
                : null)
            }
            {isSwitching && 'Switching...'}
        </>
    )
}