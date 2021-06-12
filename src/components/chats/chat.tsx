import React, { FC } from "react";
import styled from "styled-components";

import { Input } from "../inputs/input";

const ChatCard = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`;

const ChatWarper = styled.div`
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    overflow-y: auto;
`;

const MessageSender = styled.span`
    color: red;
    ::after {
        content: ":";
        color: ${({ theme }) => theme.palette.primary[100]};
    }
`;

const MessageContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const ChatBoard: FC = () => {

    return (
        <ChatCard>
            <ChatContainer>
                {/* { arr.each((msg)=>{ */}
                <MessageContainer>
                    <MessageSender>
                        {"4nkitd"}
                    </MessageSender>
                    {"msd"}
                </MessageContainer>
                {/* }) */}
            </ChatContainer>
            <ChatWarper>
                <Input placeholder="Room Name" />
            </ChatWarper>
        </ChatCard>
    );
};