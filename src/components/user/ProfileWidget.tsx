import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Card } from '../card/Card';
import { notDraggable } from '../../library/mixin/mixin';
import { gql, useQuery } from '@apollo/client';

const ProfilePicture = styled.div`
    background: ${({theme}) => theme.palette.primary[700]};
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

const TextPlaceholder = styled.div<{ w?: string }>`
    height: 1em;
    width: ${({ w }) => w ? w : '10em'};
`;

const PROFILE_WIDGET_QUERY = gql`
    query {
        me {
            id
            avatar
            username
        }
    }
`;

export const ProfileWidget = () => {
    const { loading, data, error } = useQuery(
        PROFILE_WIDGET_QUERY,
        { fetchPolicy: "network-only" }
    );

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
            <ProfilePicture>
                <img src={data.me?.avatar} />
            </ProfilePicture>
            Hello {data.me?.username}
            <Link href="/profile">Profile</Link>
        </Card>
    );
};