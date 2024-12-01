import React, { useState } from 'react';
import styled from 'styled-components';

export function useMessage(): { msg: string, msgToggle: boolean, showMessage: (message: string) => void } {
    const [msg, setMsg] = useState<string>('');
    const [msgToggle, setMsgToggle] = useState<boolean>(false);

    function showMessage(message: string) {
        setMsg(message);
        setMsgToggle(true);
        setTimeout(() => {
            setMsgToggle(false);
        }, 1500);
    }

    return { msg, msgToggle, showMessage };
}

interface MessageProps {
    text: string;
}

const Message: React.FC<MessageProps> = ({ text }: MessageProps) => {
    return <MsgNotification>{text}</MsgNotification>;
};

export default Message;

const MsgNotification = styled.div`
    position: fixed;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 40px;
    height: 2em;
    line-height: 2em;
    border-radius: 10px;
    text-align: center;
    z-index: 10000;
    font-size: 18px;
    animation: fadeIn 0.3s forwards;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    border: 3px solid #02be33;
    background-color: #daffe1;
    color: black;
`;