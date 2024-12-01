import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectWallet } from '../ConnectWallet';

import './index.scss';

function Nav({ address }) {
  const [isActive, setIsActive] = useState<any>();

  useEffect(() => {
    const currentLocationPath = location.pathname;
    setIsActive(currentLocationPath);
  }, []);

  return (
    <div className='nav-wrap'>
      <div className='home-title'>MarketPlace</div>
      <div className='route-wrap'>
        <Link
          className={`nav-title ${isActive === '/' ? 'active' : ''}`}
          onClick={() => {
            setIsActive('/');
          }}
          to={'/'}
        >
          Home
        </Link>
        <Link
          className={`nav-title ${isActive === '/owned' ? 'active' : ''}`}
          to={'/owned'}
          onClick={() => {
            setIsActive('/owned');
          }}
        >
          Owned
        </Link>
        <Link
          className={`nav-title ${isActive === '/listing' ? 'active' : ''}`}
          to={'/listing'}
          onClick={() => {
            setIsActive('/listing');
          }}
        >
          Listing
        </Link>
        {address === '0xb4C3DF96E621174B4ADED06b91fb2EbEC33891EA' && (
          <Link
            className={`nav-title ${isActive === '/create' ? 'active' : ''}`}
            to={'/create'}
            onClick={() => {
              setIsActive('/create');
            }}
          >
            Create
          </Link>
        )}
      </div>
      <ConnectWallet />
    </div>
  );
}

export default Nav;
