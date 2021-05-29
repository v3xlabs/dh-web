import React, { FC } from 'react';
import styled from 'styled-components';
import { userSelector } from '../../library/auth/useUser';
import { Card } from '../card/Card';
import { notDraggable } from '../../library/mixin/mixin'
import { useRecoilValue } from 'recoil';
import { gql, useQuery } from '@apollo/client';

const Title = styled.div`
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
`;

const AddButton = styled.button`
    background: ${({ theme }) => theme.palette.primary[600]};
    border: none;
    outline: none;
    padding: 1rem 1rem;
    font-size: 2rem;
    line-height: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: ${({ theme }) => theme.animation.micro};
    color: ${({ theme }) => theme.palette.buttonText};
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 3rem;
    width: 3rem;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[300]};
    }
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.palette.primary[600]};
`;

const ScheduleEntry = styled.div`
    padding: 0.5rem 2rem;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[300]};
    }
`;

const Time = styled.div`
    color: ${({ theme }) => theme.palette.accent.default};
    font-size: 1.2rem;
`;

const Text = styled.div`
    font-weight: 700;
`;

const MiniImage = styled.img`
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
    ${notDraggable}
`;

const Owner = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
        padding-left: 0.5rem;
        font-size: 1rem;
        color: ${({ theme }) => theme.palette.primary[300]};
    }
`;

const Explore = styled.div`
    padding: 1.4rem 2rem;
    font-weight: 700;
    background: ${({ theme }) => theme.palette.primary[700]};
    border-end-end-radius: ${({ theme }) => theme.borderRadius};
    border-end-start-radius: ${({ theme }) => theme.borderRadius};
`;


const PROFILE_WIDGET_QUERY = gql`
query {
              getMe {
                  id
                  avatar
                  username
              }
          }
`;


export const Schedule: FC = () => {

    const { loading, data } = useQuery(
        PROFILE_WIDGET_QUERY,
        { fetchPolicy: "network-only" }
    );

    if (loading) {
        return (
            <p>Loading....</p>
        )
    }

    return (
        <Card margin>
            <Title>
                Scheduled Rooms
                <AddButton>+</AddButton>
            </Title>
            <Line />
            {
                [
                    { name: 'Hello World', time: '9:00 PM', owner: data.getMe },
                    { name: 'Hello World', time: '9:00 PM', owner: data.getMe },
                    { name: 'Hello World', time: '9:00 PM', owner: data.getMe }
                ].map((room, index) => (
                    <React.Fragment key={index}>
                        <ScheduleEntry>
                            <Time>{room.time}</Time>
                            <Text>{room.name}</Text>
                            <Owner>
                                <MiniImage src={room.owner?.avatar} />
                                <span>{room.owner?.username}</span>
                            </Owner>
                        </ScheduleEntry>
                        <Line />
                    </React.Fragment>
                ))
            }
            <Explore>
                Explore more rooms
            </Explore>
        </Card>
    );
};