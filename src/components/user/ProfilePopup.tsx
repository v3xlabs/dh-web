import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { accessTokenState } from '../../library/auth/useUser';

const Wrapper = styled.div`
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

const Item = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1rem;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[700]};
    }
`;

export const ProfilePopup = () => {
    const router = useRouter();
    const resetToken = useResetRecoilState(accessTokenState);
    
    return (
        <Wrapper>
            {
                [
                    { label: 'Profile', route: '/profile' }
                ].map((entry, index) => (
                    <Link href={entry.route}>
                        <Item key={index}>
                            {entry.label}
                        </Item>
                    </Link>
                ))
            }
            <Item onClick={() => {
                localStorage.removeItem('@dh/token');
                resetToken();
                router.push('/login');
            }}>
                Logout
            </Item>
        </Wrapper>
    );
};