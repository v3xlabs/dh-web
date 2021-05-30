import React, { FC } from 'react';
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

export const Rooms = () => {

    return (
        <div>
            <Header>
                <Title>
                    Your feed
                </Title>
                <Button>New room</Button>
            </Header>
            <RoomList />
        </div>
    );
};