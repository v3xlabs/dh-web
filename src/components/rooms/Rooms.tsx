import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Room } from '../../types/room';
import { Button } from '../button/Button';
import { Card } from '../card/Card';

export const RoomList = () => {
    const rooms: Room[] = [
        { name: 'Dogehouse to the moon', description: 'Hello World', id: '1', members: [] },
        { name: 'Crypto Talks with Steve', description: 'Hello World', id: '1', members: [] }
    ];

    return (
        <>
            {
                rooms.map((room, index) => (
                    <Card padding margin key={index}>
                        {room.name}
                    </Card>
                ))
            }
        </>
    );
}


/**
 * Header Content Stuff
 */

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 2rem 0;
`;

const Title = styled.div`
    padding: 0 0 0 2rem;
    font-size: 2rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.8rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const RoomCreationWrapper = styled.div`
    position: relative;
`;


const RoomCreationPopupWrapper = styled.div`
    position: absolute;
    top: 100%;
    margin-top: 1rem;
    min-width: 20rem;
    right: 0;
    background: ${({ theme }) => theme.palette.primary[800]};
    border: 1px solid ${({ theme }) => theme.palette.primary[600]};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow: hidden;
`;

const RoomCreationMenuItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1rem;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[700]};
    }
`;


export const Rooms = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <div>
            <Header>
                <Title>
                    Your feed
                </Title>
                <RoomCreationWrapper>
                    <Button onClick={toggleExpanded}>New room</Button>
                    {expanded && <RoomCreationPopupWrapper>
                        <RoomCreationMenuItem>
                            <p>Todo! Insert Form with Mutation. And Redirect.</p>
                        </RoomCreationMenuItem>
                    </RoomCreationPopupWrapper>}
                </RoomCreationWrapper>
            </Header>
            <RoomList />
        </div>
    );
};