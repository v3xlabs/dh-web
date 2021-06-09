import { ApolloError, ApolloQueryResult, gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";

import { ProfileWidgetQuery } from "../../__generated__/ProfileWidgetQuery";
import { notDraggable, skeletonLoaderAttributes, skeletonLoaderBase } from "../../library/mixin/mixin";
import { Button } from "../button/Button";
import { Card } from "../card/Card";

/* Top */
const ProfileContainer = styled.div`
    display:flex;
`;

const ProfilePicture = styled.div`
    background: ${({ theme }) => theme.palette.primary[700]};
    border-radius: 50%;
    overflow: hidden;
    width: 8rem;
    height: 8rem;
    img {
        width: 8rem;
        height: 8rem;
        ${notDraggable}
    }
`;

const ProfilePictureSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    ${skeletonLoaderBase}
`;

const ProfileNames = styled.div`
    margin: 1rem 0 0 1.5rem;
`;

const ProfileUsername = styled.div`
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;


const ProfileNamesSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    margin: 1rem 0 0 1.5rem;
    width: 8rem;
    height: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    ${skeletonLoaderBase}
`;

const ProfileNamesSkeletonFlexBox = styled.div`
    display: flex;
    flex-direction: column;
`;

/* End Top */

/* Bottom */
const ProfileStats = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    margin: 1.6rem 0rem 0 0rem;
    display: inline-block;
    width: 9.31rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.palette.primary[700]};
    }
`;

const ProfileStatsValue = styled.div`
    display: inline-block;
    padding-right: 0.6rem;
`;

const ProfileStatsType = styled.div`
    display: inline-block;
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;

const ProfileStatsSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 9.31rem;
    height: 3rem;
    line-height: 3rem;
    ${skeletonLoaderBase}
`;

const ProfileStatsSkeletonFlexBox = styled.div`
    margin: 1.6rem 0rem 0 0rem;
    display: flex;
    gap: 10px;
`;

const ProfileBio = styled.div`
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;

const ProfileBioSkeletonLoader = styled.div.attrs(skeletonLoaderAttributes)`
    width: 60%;
    height: 1.6rem;
    margin-top: 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    ${skeletonLoaderBase}
`;
/* End Bottom */

const HoriSplit = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    ${Button} {
        padding: 1rem;
        height: 3.8rem;
        width: 3.8rem;
    }
`;

const RoomName = styled.div`
    max-width: 100%;
    height: 4rem;
    font-size: 2rem;
    margin-bottom: 2rem;
    line-height: 2.8rem;
`;

const MemberList = styled.div`
    color: ${({theme}) => theme.palette.primary[300]};
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
`;

const ListenTime = styled.div`
    font-weight: normal;
    color: ${({theme}) => theme.palette.accent.default};
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const TextPlaceholder = styled.div<{ w?: string }>`
    height: 1em;
    width: ${({ w }) => w ? w : "10em"};
`;

const PROFILE_WIDGET_QUERY = gql`
    query ProfileWidgetQuery {
        me {
            id
            bio
            avatar
            username
            follower_count
            following_count
            current_room {
                room {
                    id
                    name
                    description
                    members {
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const ProfileWidgetDataContainer: FC = () => {
    const { loading, data, error, refetch } = useQuery<ProfileWidgetQuery>(
        PROFILE_WIDGET_QUERY,
        { fetchPolicy: "network-only" }
    );

    return <ProfileWidget data={data} loading={loading} error={error} refetch={refetch}></ProfileWidget>;
};

const LEAVE_ROOM = gql`
    mutation LeaveRoom2 {
        leaveRoom
    }
`;

type ProfileWidgetProperties = Readonly<{
    data: ProfileWidgetQuery;
    loading: boolean;
    error: ApolloError;
    refetch: () => Promise<ApolloQueryResult<unknown>>;
}>

export const ProfileWidget: FC<ProfileWidgetProperties> = ({ data, loading, error, refetch }: ProfileWidgetProperties) => {
    const router = useRouter();
    const [leaveRoom] = useMutation(LEAVE_ROOM);

    if (loading || error) {
        return (
            <Card padding>
                <ProfileContainer>
                    <ProfilePictureSkeletonLoader />
                    <ProfileNamesSkeletonFlexBox>
                        <ProfileNamesSkeletonLoader />
                        <ProfileNamesSkeletonLoader />
                    </ProfileNamesSkeletonFlexBox>
                </ProfileContainer>
                <ProfileStatsSkeletonFlexBox>
                    <ProfileStatsSkeletonLoader />
                    <ProfileStatsSkeletonLoader />
                </ProfileStatsSkeletonFlexBox>
                <ProfileBioSkeletonLoader />
            </Card>
        );
    }

    const { avatar, username, follower_count, following_count, bio, current_room } = data.me;

    if (current_room) {
        return (
            <Card padding red>
                <RoomName>{current_room.room.name}</RoomName>
                <ListenTime>Listener - 00:00:00</ListenTime>
                <MemberList>{current_room.room.members.map(member => member.user.username).join(", ")}</MemberList>
                <Flex>
                    <HoriSplit>
                        <Button variant="PRIMARY">

                        </Button>
                        <Button variant="PRIMARY" onClick={() => router.push("/room/" + current_room.room.id)}>

                        </Button>
                    </HoriSplit>
                    <Button variant="PRIMARY" onClick={async () => {
                        await leaveRoom();
                        await refetch();
                    }}>
                        Leave
                    </Button>
                </Flex>
            </Card>
        );
    }

    return (
        <Card padding>
            <ProfileContainer>
                <ProfilePicture>
                    <img src={avatar} alt="Avatar" />
                </ProfilePicture>

                <ProfileNames>
                    {username}
                    <ProfileUsername>@{username}</ProfileUsername>
                </ProfileNames>
            </ProfileContainer>


            <ProfileStats>
                <ProfileStatsValue>{follower_count}</ProfileStatsValue>
                <ProfileStatsType>followers</ProfileStatsType>
            </ProfileStats>

            <ProfileStats>
                <ProfileStatsValue>{following_count}</ProfileStatsValue>
                <ProfileStatsType>following</ProfileStatsType>
            </ProfileStats>

            <ProfileBio>{bio}</ProfileBio>
        </Card>
    );
};