import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Router, useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { RoomDataQuery } from "../../__generated__/RoomDataQuery";
import { Button } from "../../components/button/Button";


const RoomCard = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`;


const RoomHeader = styled.div`
    padding: 2rem;
    border-bottom: 1px;
    text-overflow: ellipsis;
    border-bottom: 0.5px solid  ${({ theme }) => theme.palette.primary[600]};
`;

const Title = styled.div`
    display: block;
    text-overflow: ellipsis;
    font-size: 1.8rem;
    font-weight: 600;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const SubTitle = styled.div`
    display: block;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[400]};
    span {
        margin-left: 1rem;
        color: ${({ theme }) => theme.palette.primary[100]};
    }
`;

const Description = styled.div`
    display: block;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    font-weight: 600;
    padding-top: 0.5rem;
    margin-top: 2rem;
    color: ${({ theme }) => theme.palette.primary[200]};
`;

const RoomActions = styled.div`
    display: flex;
    padding: 2rem;
    background-color: ${({ theme }) => theme.palette.primary[700]};
    border-radius: 0 0 1rem 1rem;
    color: white;
    Button {
        :first {
            
        }
        padding-top: 2rem;
        padding-bottom: 2rem;
        background-color: ${({ theme }) => theme.palette.primary[800]};
        margin-right: 1rem;
        margin-left: 1rem;
    }
`;

const RoomMembers = styled.div`
    flex: 1;
`;

const ROOM_DATA = gql`
    query RoomDataQuery ($room_id: String!) {
        room(room_id: $room_id) {
            id
            name
            description
            members {
                role
                user {
                    id
                    avatar
                    username
                }
            }
        }
    }
`;

const ROOM_JOIN_QUERY = gql`
    mutation ROOMJOIN($room_id: String!) {
        joinRoom(room_id: $room_id)
    }
`;

const LEAVE_ROOM = gql`
    mutation LeaveRoom {
        leaveRoom
    }
`;

export const RoomComponent: FC = () => {

    const router = useRouter();

    // const { data, loading, error } = useQuery(USER_ROOM);
    // const { data: roomData, loading: roomLoading, error: roomError } = useQuery(ROOM_DATA, { variables: { room_id: router.query["roomId"] || "" }, errorPolicy: "all" });

    // console.log(data, roomData);

    const [joinRoom, { data, error, loading }] = useMutation(ROOM_JOIN_QUERY, { errorPolicy: "all" });

    // const join = useCallback(async () => {
    //     const f = await joinRoom({ variables: { room_id: router.query["roomId"] || "" } });
    //     console.log(f);
    // }, []);
    // const router = useRouter();

    useEffect(() => {
        if (router.query["roomId"]) {
            joinRoom({ variables: { room_id: router.query["roomId"] || "" } });
        }
    }, [router.query]);

    if (error) {
        return (
            <>Error, probably doesnt exist</>
        );
    }

    if (!data)
        return (<></>);

    return (
        <MainRoomComponent room_id={router.query["roomId"].toString() || ""} />
    );
};

export const MainRoomComponent: FC<{ room_id: string }> = ({ room_id }: { room_id: string }) => {

    const { data, error, loading } = useQuery<RoomDataQuery>(ROOM_DATA, { variables: { room_id } });
    const [leaveRoom, _] = useMutation(LEAVE_ROOM);
    const router = useRouter();

    const theme = useTheme();
    const one = useMediaQuery(`(min-width:${theme.breakpoints.one + 1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two + 1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    if (loading || error) {
        return <></>;
    }

    return (

        <RoomCard>
            <RoomHeader>
                <Title>{data.room.name}</Title>
                <SubTitle>
                    with
                    <span>{"owner"}</span>
                </SubTitle>
                <Description>{data.room.description}</Description>
            </RoomHeader>
            <RoomMembers>
                {
                    data.room.members.map((member) => (
                        <div key={member.user.id}>{member.user.username}</div>
                    ))
                }
            </RoomMembers>
            <RoomActions>
                <Button variant="PRIMARY"><img src="/microphone.svg" alt="Microphone Button" /></Button>
                <Button variant="PRIMARY"><img src="/headphone.svg" alt="Headphone  Button" /></Button>
                <Button variant="PRIMARY"><img src="/settings.svg" alt="Settings Button" /></Button>
                <Button variant="PRIMARY"><img src="/users-plus.svg" alt="Invite Button" /></Button>
                <Button variant="PRIMARY" onClick={async () => {
                    await leaveRoom();
                    router.push("/dash");
                }}>Leave</Button>
            </RoomActions>
        </RoomCard>

    );

};
