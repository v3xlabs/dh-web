import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../button/Button';
import { Card } from '../card/Card';

export const RoomList = () => {
    const rooms = [
        { name: 'Dogehouse to the moon' },
        { name: 'Crypto Talks with Steve' }
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
    color: ${({theme}) => theme.palette.primary[100]};
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