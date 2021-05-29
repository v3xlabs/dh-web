import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useUser } from '../../library/auth/useUser';
import { Card } from '../card/Card';
import { notDraggable } from '../../library/mixin/mixin';

const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    ${notDraggable}
`;

export const ProfileWidget = () => {
    const user = useUser();

    return (
        <Card padding>
            <ProfilePicture src={user?.avatar}></ProfilePicture>
            Hello {user?.username}
            <Link href="/profile">Profile</Link>
        </Card>
    );
};