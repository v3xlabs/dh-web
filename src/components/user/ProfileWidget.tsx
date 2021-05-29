import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Card } from '../card/Card';
import { notDraggable } from '../../library/mixin/mixin';
import { gql, useQuery } from '@apollo/client';


const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    ${notDraggable}
`;

const TextPlaceholder = styled.div<{ w?: string }>`
    height: 1em;
    width: ${({ w }) => w ? w : '10em'}
`;

const PROFILE_WIDGET_QUERY = gql`
  query {
                getMe {
                    id
                    avatar
                    username
                }
            }
`;

export const ProfileWidget = () => {
    const { loading, data } = useQuery(
        PROFILE_WIDGET_QUERY,
        { fetchPolicy: "network-only" }
    );

    if (loading) {
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
            <ProfilePicture src={data.getMe?.avatar}></ProfilePicture>
            Hello {data.getMe?.username}
            <Link href="/profile">Profile</Link>
        </Card>
    );
};