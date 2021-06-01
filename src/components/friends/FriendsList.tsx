import { useQuery } from "@apollo/client";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import gql from "graphql-tag";
import React, { FC } from "react";
import styled, { useTheme } from "styled-components";

import { FriendsQuery } from "../../__generated__/FriendsQuery";
import { notDraggable } from "../../library/mixin/mixin";

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

const FRIENDS_QUERY = gql`
    query FriendsQuery {
        me {
            following {
                following {
                    avatar
                    username
                    current_room {
                        name
                    }
                }
            }
        }
    }
`;

export const FriendsList: FC = () => {

    const { loading, data, error } = useQuery<FriendsQuery>(
        FRIENDS_QUERY,
        { fetchPolicy: "network-only" }
    );

    const theme = useTheme();
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    if (loading || error) {
        return (
            <div>
                {
                    three &&
                    <Title>
                        People
                        <SubTitle>
                            ONLINE
                        </SubTitle>
                    </Title>
                }
            </div>
        );
    }

    return (
        <div>
            {
                three &&
                <Title>
                    People
                    <SubTitle>
                        ONLINE
                    </SubTitle>
                </Title>
            }
            {
                data.me.following.map(({following: user}, index) => (
                    <Line key={index}>
                        <ProfilePicture>
                            <img src={user.avatar} />
                        </ProfilePicture>
                        { user && <Dot />}
                        { three &&
                            <UserName>
                                {user.username}
                                {user.current_room &&
                                    <UserRoom>
                                        {user.current_room.name}
                                    </UserRoom>
                                }
                            </UserName>
                        }
                    </Line>
                ))
            }
        </div>
    );
};