import React from 'react';
import { useAccount } from 'wagmi';

const NFTList: React.FC = () => {
    const { address } = useAccount();
    
    return (
        <div>
        </div>
    );
};

export default NFTList;