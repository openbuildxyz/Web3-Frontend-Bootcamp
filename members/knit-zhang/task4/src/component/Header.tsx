import { Castle, } from 'lucide-react';
import WalletOption from './WalletOption';
import { useAccount, type Config } from 'wagmi';
import { Account } from './Account';

export default function Header() {
    const {  isConnected  } = useAccount<Config>();

    return (
        <div className="flex justify-around items-center " >
            <Castle size={28} />
            { isConnected ? <Account /> : <WalletOption /> }
        </div>
    )
}