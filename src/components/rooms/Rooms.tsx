import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { notDraggable } from "../../library/mixin/mixin";
import { Button } from "../button/Button";
import { Card } from "../card/Card";

const Description = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0rem;
    font-size: smaller;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.primary[300]};
`;

const VerticallyCenterAlign = styled.div`
    margin-top: -3px;
    text-transform:capitalize;
`;

const ProfilePicture = styled.div`
    overflow: hidden;
    width: 2rem;
    height: 2rem;
    display: inline;
    img {
        border-radius: 50%;
        margin-left: -0.5rem;
        width: 2.3rem;
        height: 2.3rem;
        ${notDraggable}
    }
`;

const MemberCount = styled.div`
    display: inline;
    float: right;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const Dot = styled.div`
        height: 10px;
        width: 10px;
        margin-left: 10px;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.palette.accent.default};
        border-radius: 50%;
        display: inline-block;
`;

const ProfileContainer = styled.div`
    display: inline;
    margin-right: 5px;
    margin-left: 5px;
`;

const ROOM_LIST_QUERY = gql`
    query {
        rooms {
            id
            name
            members {
                user {
                    avatar
                    username
                }
            }
        }
    }
`;

const ROOM_LIST_SUBSCRIPTION = gql`
    subscription{
        roomChange {
            event
            room {
                id
                name
                members {
                    user {
                        avatar 
                        username
                    }
                }
            }
        }
    }
`;



export const RoomList: FC = () => {

    const [rooms, setRooms] = useState([]);

    const { loading, data, error } = useQuery(
        ROOM_LIST_QUERY,
        { fetchPolicy: "network-only" }
    );

    const { data: subscriptionData, error: subError } = useSubscription(
        ROOM_LIST_SUBSCRIPTION,
        { fetchPolicy: "network-only" }
    );

    useEffect(() => {
        if (!loading && !error) {
            setRooms(data.rooms);
            console.log("Adding initial data" + subscriptionData);
        }

    }, [data]);

    useEffect(() => {
        console.log("Adding update", subscriptionData);
        if (!subError && subscriptionData && subscriptionData.roomChange.event === "CREATE") {
            setRooms([...rooms, subscriptionData.roomChange.room]);
        }
    }, [subscriptionData]);


    if (loading) {
        return (<p>...Loading</p>);
    } else if (error || subError) {
        return (<p>...Query or Subscription Failed</p>);
    }

    if (rooms.length === 0) {
        return (<p>No Rooms.</p>);
    }

    return (
        <>
            {
                rooms.map((room, index) => (
                    <Card padding margin key={index}>
                        {room.name}
                        <MemberCount>
                            <Dot />{room.members?.length || 0}
                        </MemberCount>
                        <br />

                        <Description>
                            <ProfileContainer>
                                {
                                    room.members.map((member, index) => (
                                        <ProfilePicture key={index}>
                                            <img srcSet={member.avatar} src={member.avatar} />
                                        </ProfilePicture>
                                    ))
                                }
                            </ProfileContainer>
                            <VerticallyCenterAlign>
                                {
                                    room.members.map((member) => (
                                        member.username + ", "
                                    ))
                                }
                            </VerticallyCenterAlign>
                        </Description>
                    </Card>
                ))
            }
        </>
    );
};


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


export const Rooms: FC = () => {
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