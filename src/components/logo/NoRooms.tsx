import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ small: boolean }>`
    display: flex;
    justify-content: ${({ small }) => small ? "center" : "flex-start"};
    align-items: center;
    flex: 1 100%;
    padding: 10rem;
    cursor: pointer;
`;

const Icon = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    height: auto;
    flex: 1 100%;
`;

const Text = styled.div`
    color: ${({ theme }) => theme.palette.primary[700]};
    font-weight: 700;
    flex: 1 100%;    
    font-size: 3rem;
    font-weight: 700;
    margin-top: 40px;
    text-align: center !important;
`;

type LogoProperties = Readonly<{
    small?: boolean;
}>

export function NoRooms({ small }: LogoProperties): JSX.Element {
    return (
        <Wrapper small={small}>
            <Icon>
                <img src="/no_rooms.svg" alt="No Rooms" width="100%" />
                <Text>No Rooms, let&lsquo;s create one.</Text>
            </Icon>
        </Wrapper>
    );
}