import React from 'react';
import styled from 'styled-components';

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }: LoadingOverlayProps) => {
    return (
        <>
            {isLoading && (<Overlay>Loading...</Overlay>)}
        </>
    );
};

export default LoadingOverlay;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #745ec2;
    z-index: 9999;

    &::after {
        content: '⏳';
        animation: spin 2s infinite linear;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
