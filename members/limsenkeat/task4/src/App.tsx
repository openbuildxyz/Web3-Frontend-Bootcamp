import { ConnectButton } from '@rainbow-me/rainbowkit';
import ListNFT from './ListNFT';
import NFTMarket from './NFTMarket';

const App = () => {

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
			
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-end mb-8">
					<input type="checkbox" name="light-switch" className="light-switch sr-only" />
					<ConnectButton />
				</div>
				<h1 className="text-4xl font-bold text-center text-white mb-8">NFT Market</h1>
				<div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
					<div className="col-span-2"><NFTMarket /></div>
					<div><ListNFT /></div>
				</div>
			</div>
		</div>
	);
	
};

export default App;
