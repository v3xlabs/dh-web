import { ApolloError, gql, useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import styled from "styled-components";

import { ProfileIconQuery } from "../../__generated__/ProfileIconQuery";
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


const PROFILE_ICON_QUERY = gql`
    query ProfileIconQuery {
        me {
            id
            avatar
            username
        }
    }
`;

export const ProfileIconDataContainer: FC = () => {
    const { loading, data, error } = useQuery<ProfileIconQuery>(
        PROFILE_ICON_QUERY,
        { fetchPolicy: "network-only" }
    );
    return (<ProfileIcon loading={loading} data={data} error={error} />);
};


type ProfileIconProperties = Readonly<{
    data: ProfileIconQuery;
    loading: boolean;
    error: ApolloError;
}>

export const ProfileIcon: FC<ProfileIconProperties> = ({ loading, error, data }: ProfileIconProperties) => {
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
            <Icon src={data?.me.avatar} onClick={() => {
                setExpanded(!expanded);
            }} />
            {expanded && <ProfilePopup />}
        </Wrapper>
    );
};