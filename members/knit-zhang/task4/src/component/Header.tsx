import { Castle, CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import WalletOption from './WalletOption';

export default function Header() {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    return (
        <div className="flex justify-around items-center " >
            <Castle size={28} />
            { isConnected ? <CircleUserRound /> : <WalletOption onClick={() => setIsConnected(true)}/> }
        </div>
    )
}