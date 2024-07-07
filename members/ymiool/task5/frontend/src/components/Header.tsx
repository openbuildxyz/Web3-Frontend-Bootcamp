import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import styled from 'styled-components';
import AuthBar from './AuthBar';

const Header: React.FC = () => {
    return (
        <MarketHeader>
            <MarketTitle>🔮NFT Market</MarketTitle>
            <RightPart>
                <AuthBar></AuthBar>
                <ConnectButton></ConnectButton>
            </RightPart>
        </MarketHeader>
    );
};

export default Header;

const MarketHeader = styled.header`
    display: flex;
    position: sticky;
    top: 0;
    justify-content: space-between;
    background-color: #f8f9fa;
    padding: 20px;
    border-top: 6px solid #745ec2;
    box-shadow: 0px 0px 6px rgb(102 100 214 / 50%);
    width: 100%;
    box-sizing: border-box;
`;

const MarketTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
`;

const RightPart = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;