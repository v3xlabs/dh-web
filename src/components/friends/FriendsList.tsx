import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { notDraggable } from '../../library/mixin/mixin';
import { User } from '../../types/user';
import useMediaQuery from "@material-ui/core/useMediaQuery";


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
    background: ${({ theme }) => theme.palette.primary[700]};
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
    display: inline;
    text-overflow: ellipsis;
`;

const Line = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const UserRoom = styled.div`
    display: block;
    text-decoration: none;
    cursor: pointer;
    font-weight: 300;
    text-transform: capitalize;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.palette.primary[300]};
`;

const Dot = styled.div`
        height: 8px;
        width: 8px;
        margin-left: -2rem;
        margin-bottom: -3rem;
        background-color: ${({ theme }) => theme.palette.accent.default};
        border-radius: 50%;
        display: inline-block;
`;

export const FriendsList = () => {

    const friends: User[] = [

        { username: "carlos", avatar: "https://avatars.githubusercontent.com/u/52023083?v=4", room: "main room", online: true },
        { username: "carlos", avatar: "https://avatars.githubusercontent.com/u/52023083?v=4", room: "", online: true },

    ];

    const theme = useTheme();
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    return (
        <div>
            { three &&
                <Title>
                    People
                    <SubTitle>
                        ONLINE
                    </SubTitle>
                </Title>
            }
            {friends.map((user, index) => (
                <Line>

                    <ProfilePicture>
                        <img src={user?.avatar} />
                    </ProfilePicture>

                    { user?.online && <Dot />}

                    { three &&
                        <UserName>
                            {user?.username}
                            {user?.room != "" &&
                                <UserRoom>
                                    {user?.room}
                                </UserRoom>
                            }
                        </UserName>
                    }

                </Line>

            ))}


        </div>
    );
};