import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

import { notDraggable } from "../../library/mixin/mixin";
import { User } from "../../types/User";
import { Card } from "../card/Card";

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

const ProfileNames = styled.div`
    margin: 1rem 0 0 1.5rem;
`;

const ProfileUsername = styled.div`
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;

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
        background: ${({ theme }) => theme.palette.primary[400]};
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

const ProfileBio = styled.div`
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.palette.primary[300]};
    font-weight: 10;
`;

const TextPlaceholder = styled.div<{ w?: string }>`
    height: 1em;
    width: ${({ w }) => w ? w : "10em"};
`;

const PROFILE_WIDGET_QUERY = gql`
    query ProfileBannerWidgetQuery {
        me {
            id
            bio
            avatar
            username
            follower_count
            following_count
        }
    }
`;

export const ProfileWidgetDataContainer: FC = () => {
    const { loading, data, error } = useQuery(
        PROFILE_WIDGET_QUERY,
        { fetchPolicy: "network-only" }
    );

    return <ProfileWidget data={data} loading={loading} error={error}></ProfileWidget>;
};

type ProfileWidgetProperties = Readonly<{
    data: unknown & { me: User };
    loading: unknown;
    error: unknown;
}>

export const ProfileWidget: FC<ProfileWidgetProperties> = ({ data, loading, error }: ProfileWidgetProperties) => {
    if (loading || error) {
        return (
            <Card padding>
                <ProfilePicture></ProfilePicture>
                <TextPlaceholder />
                <Link href="/profile">Profile</Link>
            </Card>
        );
    }

    return (
        <Card padding>
            <ProfileContainer>
                <ProfilePicture>
                    <img src={data.me?.avatar} alt="Avatar" />
                </ProfilePicture>

                <ProfileNames>
                    {data.me?.username}
                    <ProfileUsername>@{data.me?.username}</ProfileUsername>
                </ProfileNames>
            </ProfileContainer>


            <ProfileStats>
                <ProfileStatsValue>{data.me?.follower_count}</ProfileStatsValue>
                <ProfileStatsType>followers</ProfileStatsType>
            </ProfileStats>

            <ProfileStats>
                <ProfileStatsValue>{data.me?.following_count}</ProfileStatsValue>
                <ProfileStatsType>following</ProfileStatsType>
            </ProfileStats>

            <ProfileBio>{data.me?.bio}</ProfileBio>
        </Card>
    );
};