import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectWallet } from '../ConnectWallet';

import './index.scss';

function Nav() {
  const [isActive, setIsActive] = useState('/');

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
          className={`nav-title ${isActive === '/create' ? 'active' : ''}`}
          to={'/create'}
          onClick={() => {
            setIsActive('/create');
          }}
        >
          Create
        </Link>
      </div>
      <ConnectWallet />
    </div>
  );
}

export default Nav;
