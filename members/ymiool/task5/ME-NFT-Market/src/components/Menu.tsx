import React from 'react';
import styled from 'styled-components';

const Menu: React.FC = () => {
    return (
        <FloatButton><BtnText>➕</BtnText></FloatButton>
    );
};

export default Menu;

const FloatButton = styled.button`
    position: fixed;
    right: 20px;
    bottom: 20px;
    border: 3px solid #745ec2;
    box-shadow: 4px 4px 14px rgb(102 100 214 / 50%);
    color: black;
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 40px;
    padding: 0;
    box-sizing: content-box;

    &:hover {
        width: 180px;
        border-color: #f2eeda;
    }

    transition: all 0.3s;
`;

const BtnText = styled.span`
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 60px;

    &:hover {
        &::before {
            content: '上架 NFT ';
        }
`;