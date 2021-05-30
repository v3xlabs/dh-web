import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { FC, useState } from "react";
import styled from "styled-components";

import { User } from "../../types/User";
import { ProfilePopup } from "./ProfilePopup";

const Wrapper = styled.div`
    position: relative;
`;

const Icon = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary[700]};
    cursor: pointer;
`;

type PROFILE_ICON_TYPE = {
    me: User
};

const PROFILE_ICON_QUERY = gql`
    query {
        me {
            id
            avatar
            username
        }
    }
`;

export const ProfileIcon: FC = () => {
    const { loading, data, error } = useQuery<PROFILE_ICON_TYPE>(
        PROFILE_ICON_QUERY,
        { fetchPolicy: "network-only" }
    );
    const [expanded, setExpanded] = useState(false);

    if (loading || error) {
        return (
            <Wrapper>
                <Icon />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Icon src={data.me.avatar} onClick={() => {
                setExpanded(!expanded);
            }} />
            {expanded && <ProfilePopup />}
        </Wrapper>
    );
};