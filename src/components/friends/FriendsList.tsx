import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Card } from '../card/Card';
import { notDraggable } from '../../library/mixin/mixin';
import { gql, useQuery } from '@apollo/client';
import { User } from '../../types/user';


const Title = styled.div`
    display: block;
    font-size: 2rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const SubTitle = styled.div`
    display: block;
    font-size: 1.2rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.8rem;
    color: ${({ theme }) => theme.palette.primary[300]};
`;

const ProfilePicture = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    background: ${({theme}) => theme.palette.primary[700]};
    border-radius: 50%;
    overflow: hidden;
    width: 5rem;
    height: 5rem;
    img {
        width: 5rem;
        height: 5rem;
        ${notDraggable}
    }
`;

const UserName = styled.div`
    font-weight: 700;
    padding: 2rem;
    display: online
`;

const Line = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const FriendsList = () => {

    const friends: User[] = [

                { username: "carlos", avatar: "https://avatars.githubusercontent.com/u/52023083?v=4" },
                { username: "carlos", avatar: "https://avatars.githubusercontent.com/u/52023083?v=4" },

    ];
    
    return (
        <div>

            <Title>
                People
                <SubTitle>
                    ONLINE
                </SubTitle>
            </Title>

            {friends.map((user, index)=>(
                <Line>

                <ProfilePicture>
                        <img src={user?.avatar} />
                </ProfilePicture>
                <UserName> {user?.username} </UserName>

                </Line>
            ))}

            
        </div>
    );
};