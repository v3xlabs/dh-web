import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

import { CreateNewRoomMutation, CreateNewRoomMutationVariables } from "../../__generated__/CreateNewRoomMutation";
import { RoomListQuery } from "../../__generated__/RoomListQuery";
import { RoomListSubscription } from "../../__generated__/RoomListSubscription";
import { notDraggable } from "../../library/mixin/mixin";
import { Button } from "../button/Button";
import { Card } from "../card/Card";
import { NoRooms } from "../logo/NoRooms";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

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
    query RoomListQuery {
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
    subscription RoomListSubscription {
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

export const RoomListDataContainer: FC = () => {

    const { loading, data, error, subscribeToMore } = useQuery<RoomListQuery>(
        ROOM_LIST_QUERY,
        { fetchPolicy: "cache-first" }
    );

    return (
        <RoomList loading={loading} error={error} data={data}
            roomUpdates={() => subscribeToMore<RoomListSubscription>({
                onError: console.error,
                document: ROOM_LIST_SUBSCRIPTION, variables: {}, updateQuery: (previous, { subscriptionData }) => {
                    if (!subscriptionData) return previous;

                    if (subscriptionData.data.roomChange.event === "CREATE") {
                        return {
                            ...previous,
                            rooms: [...previous.rooms, subscriptionData.data.roomChange.room]
                        };
                    }

                    if (subscriptionData.data.roomChange.event === "DELETE") {
                        return {
                            ...previous,
                            rooms: previous.rooms.filter(room => room.id !== subscriptionData.data.roomChange.room.id)
                        };
                    }

                    console.log("UB!");
                    return previous;
                }
            })} />
    );
};

type RoomListProperties = Readonly<{
    loading: boolean,
    error: ApolloError,
    data: RoomListQuery
    roomUpdates: () => () => void
}>

export const RoomList: FC<RoomListProperties> = ({ loading, error, data, roomUpdates }: RoomListProperties) => {

    useEffect(() => {
        roomUpdates();
        console.log("REGISTRED DA FUCK");
    }, [0]);

    if (loading) {
        return (<p>...Loading</p>);
    } else if (error) {
        return (<p>...Query Failed</p>);
    }

    if (data.rooms.length === 0) {
        return (
            <NoRooms />
        );
    }

    return (
        <Wrapper>
            {
                data.rooms.map((room, index) => (
                    <Card padding key={index}>
                        {room.name}
                        <MemberCount>
                            <Dot />{room.members?.length || 0}
                        </MemberCount>


                        <Description>
                            <ProfileContainer>
                                {
                                    room.members.map((member, index) => (
                                        <ProfilePicture key={index}>
                                            <img srcSet={member.user.avatar} src={member.user.avatar} alt="Avatar" />
                                        </ProfilePicture>
                                    ))
                                }
                            </ProfileContainer>
                            <VerticallyCenterAlign>
                                {
                                    room.members.map((member) => (
                                        member.user.username + ", "
                                    ))
                                }
                            </VerticallyCenterAlign>
                        </Description>
                    </Card>
                ))
            }
        </Wrapper>
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





type RoomCreationFormValidationVals = Readonly<{
    name: string;
    description?: string;
}>;

const roomCreationFormValidationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().optional(),
});

const CREATE_NEW_ROOM_MUTATION = gql`
    mutation CreateNewRoomMutation($name: String!, $description: String) {
        createRoom(name: $name, description: $description) {
            id
            name
        }
    }
`;

export const RoomCreationForm: FC = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    const { register, handleSubmit, formState: { errors } } = useForm<RoomCreationFormValidationVals>({
        resolver: yupResolver(roomCreationFormValidationSchema)
    });

    const [createNewRoom, { data, loading, error }] = useMutation<CreateNewRoomMutation, CreateNewRoomMutationVariables>(CREATE_NEW_ROOM_MUTATION);

    const onSubmit = handleSubmit((data) => {
        createNewRoom({ variables: { name: data.name, description: data.description } });
    });


    if (loading) {
        return (<p>...Loading</p>);
    } else if (error) {
        return (<p>...Mutation Failed</p>);
    }

    return (
        <RoomCreationWrapper>
            <Button variant="ACCENT" onClick={toggleExpanded}>New room</Button>
            {expanded && (<RoomCreationPopupWrapper>
                <RoomCreationMenuItem>
                    {data ? (<div>
                        <p>Room {data.createRoom.id}: {data.createRoom.name} created</p>
                    </div>) : (<form onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder="Room Name" {...register("name")} />
                        <p>{errors.name?.message}</p>
                        <input placeholder="Room Description" {...register("description")} />
                        <p>{errors.description?.message}</p>
                        <input type="Submit" />
                    </form>)}
                </RoomCreationMenuItem>
            </RoomCreationPopupWrapper>)}
        </RoomCreationWrapper>
    );
};

export const Rooms: FC = () => {
    return (
        <div>
            <Header>
                <Title>
                    Your feed
                </Title>
                <RoomCreationForm />
            </Header>
            <RoomListDataContainer />
        </div>
    );
};