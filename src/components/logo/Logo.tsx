import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

const Icon = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    height: 4rem;
    width: 4rem;
    max-width: 4rem;
    max-height: 4rem;
`;

const Text = styled.div`
    color: ${({ theme }) => theme.palette.accent.default};
    font-weight: 700;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 2rem;
    font-size: 2rem;
    height: 100%;
    span + span {
        font-size: 1.4rem;
        line-height: 1.4rem;
    }
`;

export const Logo: FC<{ small?: boolean }> = ({ small }) => {

    return (
        <Wrapper>
            <Icon>
                <img src="https://cdn.lvk.sh/dogehouse/logo.svg" alt="" />
            </Icon>
            { !small &&
                <Text>
                    <span>Dogehouse</span>
                    <span>Revived</span>
                </Text>
            }
        </Wrapper>
    );
};