import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{small: boolean}>`
    display: flex;
    justify-content: ${({small}) => small ? "center" : "flex-start"};
    align-items: center;
    width: 100%;
    cursor: pointer;
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

type LogoProperties = {
    small?: boolean;
}


export const Logo: FC<LogoProperties> = ({ small }: LogoProperties) => {

    const router = useRouter();
    const handleClick = (element) => {
        element.preventDefault();
        router.push("/dashboard");
    };

    return (
        <Wrapper small={small} onClick={handleClick}>
            <Icon>
                <img src="https://cdn.lvk.sh/dogehouse/logo.svg" alt="Dogehouse Revived" />
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