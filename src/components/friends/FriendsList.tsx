import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { FC } from "react";
import styled, { useTheme } from "styled-components";

import { FriendsQuery } from "../../__generated__/FriendsQuery";
import useMediaQuery from "../../library/hooks/useMediaQuery";
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
    background: ${({ theme }) => theme.palette.primary[700]};
    border-radius: 50%;
    overflow: hidden;
    width: 4rem;
    height: 4rem;
    img {
        width: 4rem;
        height: 4rem;
        ${notDraggable}
    }
`;

const UserName = styled.div`
    font-weight: 700;
    padding-left: 2rem;
    display: inline;
    text-overflow: ellipsis;
`;

const Line = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
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
    height: 12px;
    width: 12px;
    background-color: ${({ theme }) => theme.palette.accent.default};
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 29px;
    bottom: -2px;
    border: 2px solid ${({ theme }) => theme.palette.primary[900]};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:30px;
`;

const FRIENDS_QUERY = gql`
    query FriendsQuery {
        me {
            following {
                following {
                    id
                    avatar
                    username
                    current_room {
                        room {
                            name
                        }
                    }
                }
            }
        }
    }
`;

/**
 * @TODO (Real Time Feedback) implement subscription
 * to update friends list when user activity changes.
 */
export const FriendsList: FC = () => {

    const { loading, data, error } = useQuery<FriendsQuery>(
        FRIENDS_QUERY,
        { fetchPolicy: "network-only" }
    );

    const theme = useTheme();
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    if (loading || error) {
        return (
            <Wrapper>
                {
                    three &&
                    <Title>
                        People
                        <SubTitle>
                            ONLINE
                        </SubTitle>
                    </Title>
                }
            </Wrapper>
        );
    }

    return (
        <Wrapper>
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
                data.me.following.map(({ following: user }) => (
                    <Line key={user.id}>
                        <ProfilePicture>
                            <img src={user.avatar} alt="User Avatar" />
                        </ProfilePicture>
                        { user && <Dot />}
                        { three &&
                            <UserName>
                                {user.username}
                                {user.current_room &&
                                    <UserRoom>
                                        {user.current_room.room.name}
                                    </UserRoom>
                                }
                            </UserName>
                        }
                    </Line>
                ))
            }
        </Wrapper>
    );
};