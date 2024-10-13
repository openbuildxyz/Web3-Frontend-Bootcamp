import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FiSun, FiMoon } from "react-icons/fi";
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem';
import { TOKEN_ADDRESS } from "./config";
import TOKEN_ABI from './abi/FeatherToken.json';
import ListNFT from './ListNFT';
import MintNFT from './MintNFT';
import NFTMarket from './NFTMarket';

const App = () => {

	const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : true;
    });
    const { address, isConnected } = useAccount();

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };
    
    const { data: featherBalance } = useReadContract({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address],
        // enabled: isConnected,
    });
    
	return (
		<div className="min-h-screen">
            <nav className="container mx-auto px-4 py-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">MomBirds NFT Marketplace</h1>
                <div className="flex items-center space-x-4">
                    {isConnected && (
                        <span className="font-semibold text-lg text-slate-900 dark:text-gray-100">
                            {featherBalance != null ? `${formatEther(featherBalance as bigint)} $FEA` : 'Loading...'}
                        </span>
                    )}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                        {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                    </button>
                    <ConnectButton />
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <NFTMarket />
                    </div>
                    <div>
                        <ListNFT />
                        <MintNFT />
                    </div>
                </div>
            </main>
        </div>
	);
	
};

export default App;