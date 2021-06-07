import React, { FC } from "react";
import styled from "styled-components";

import { notDraggable } from "../../library/mixin/mixin";

const Wrapper = styled.div<{ small: boolean }>`
    display: flex;
    justify-content: ${({ small }) => small ? "center" : "flex-start"};
    align-items: center;
    flex: 1 100%;
    padding: 10rem;
`;

const Icon = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    height: auto;
    flex: 1 100%;
    pointer-events: none;
    ${notDraggable}
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

export const NoRooms: FC<LogoProperties> = ({ small }: LogoProperties) => (
    <Wrapper small={small}>
        <Icon>
            <img src="/no_rooms.svg" alt="No Rooms" width="100%" />
            <Text>No Rooms, let&lsquo;s create one.</Text>
        </Icon>
    </Wrapper>
);