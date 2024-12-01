import { NavLink } from 'react-router-dom';
import '../css/navigator.css'
import { useEthers } from './EthersContext';

const Navigator = function({ address, balance }) {
    const { handleConnect } = useEthers();


    return (
        <div className='navbar'> 
            <div className='navbar-brand'>
                {'NFT Market'}
            </div>
            <div className='navbar-links'>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                <NavLink to='/MyNFT' className={({ isActive }) => (isActive ? 'active-link' : '')}>MyNFT</NavLink>
                <NavLink to='/Mint' className={({ isActive }) => (isActive ? 'active-link' : '')}>Mint</NavLink>
                <NavLink to='/Faucet' className={({ isActive }) => (isActive ? 'active-link' : '')}>FT Faucet</NavLink>
            </div>

            <div className='balance'>
                FTBalance: {balance}                
            </div>

            <div className='navbar-wallet' style={{width: '50px'}}>
                {address ?
                <div className='address-display'>
                    {address.slice(0, 8)}
                </div>
                : (
                    <button className='connect-button' onClick={handleConnect}>连接钱包</button>
                )}
            </div>
        </div>
    )
}

export default Navigator;