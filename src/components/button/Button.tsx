import React, { FC } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    label: string;
};

const Wrapper = styled.button`
    background: ${({theme}) => theme.palette.accent.default};
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: ${({theme}) => theme.borderRadius};
    margin-top: 1rem;
    cursor: pointer;
    transition: ${({theme}) => theme.animation.micro};
    color: ${({theme}) => theme.palette.buttonText};
    font-weight: 700;
    &:hover {
        background: ${({theme}) => theme.palette.accent.hover};
    }
`;

export const Button: FC<ButtonProps> = ({ label }) => {

    return (
        <Wrapper>
            { label }
        </Wrapper>
    );
};