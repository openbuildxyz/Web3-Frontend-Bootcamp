import { useAccount } from 'wagmi';
import { Connect } from './Connect';
import { Account } from './Account';

function Header() {
    const { isConnected } = useAccount();
    return (
        <div>
            <div >{isConnected ? <Account /> : <Connect />}</div>
        </div>
    )
}

export default Header;