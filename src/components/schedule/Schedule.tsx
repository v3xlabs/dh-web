import { ApolloError, gql, useQuery } from "@apollo/client";
import React, { FC } from "react";
import styled from "styled-components";

import { ScheduleQuery } from "../../__generated__/ScheduleQuery";
import { notDraggable } from "../../library/mixin/mixin";
import { Card } from "../card/Card";

const Title = styled.div`
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
`;

const AddButton = styled.button`
    background: ${({ theme }) => theme.palette.primary[600]};
    border: none;
    outline: none;
    padding: 1rem 1rem;
    font-size: 2rem;
    line-height: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: ${({ theme }) => theme.animation.micro};
    color: ${({ theme }) => theme.palette.buttonText};
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 3rem;
    width: 3rem;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[500]};
    }
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.palette.primary[600]};
`;

const ScheduleEntry = styled.div`
    padding: 0.5rem 2rem;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[700]};
    }
`;

const Time = styled.div`
    color: ${({ theme }) => theme.palette.accent.default};
    font-size: 1.2rem;
`;

const Text = styled.div`
    font-weight: 700;
`;

const MiniImage = styled.img`
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
    ${notDraggable}
`;

const Owner = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
        padding-left: 0.5rem;
        font-size: 1rem;
        color: ${({ theme }) => theme.palette.primary[300]};
    }
`;

const Explore = styled.div`
    padding: 1.4rem 2rem;
    font-weight: 700;
    background: ${({ theme }) => theme.palette.primary[700]};
    border-end-end-radius: ${({ theme }) => theme.borderRadius};
    border-end-start-radius: ${({ theme }) => theme.borderRadius};
`;


const SCHEDULE_QUERY = gql`
    query ScheduleQuery {
        me {
            id
            avatar
            username
        }
    }
`;

export const ScheduleDataContainer: FC = () => {
    const { loading, data, error } = useQuery<ScheduleQuery>(
        SCHEDULE_QUERY,
        { fetchPolicy: "network-only" }
    );
    return (<Schedule loading={loading} data={data} error={error} />);
};

type ScheduleProperties = Readonly<{
    data: ScheduleQuery;
    loading: boolean;
    error: ApolloError;
}>


export const Schedule: FC<ScheduleProperties> = ({ data, loading, error }: ScheduleProperties) => {
    if (loading || error) {
        return (
            <Card margin>
                <Title>
                    Scheduled Rooms
                    <AddButton>+</AddButton>
                </Title>
                <Line />
                <Explore>
                    Explore more rooms
                </Explore>
            </Card>
        );
    }

    /**
     * @TODO Replace key={index.toString()} with room id or something.
     * once that data is available.
     */
    return (
        <Card margin>
            <Title>
                Scheduled Rooms
                <AddButton>+</AddButton>
            </Title>
            <Line />
            {
                [
                    { name: "Hello World1", time: "9:00 PM", owner: data?.me },
                    { name: "Hello World2", time: "10:00 PM", owner: data?.me },
                    { name: "Hello World3", time: "11:00 PM", owner: data?.me }
                ].map((room, index) => (
                    <React.Fragment key={index.toString()}>
                        <ScheduleEntry>
                            <Time>{room.time}</Time>
                            <Text>{room.name}</Text>
                            <Owner>
                                <MiniImage src={room.owner?.avatar} />
                                <span>{room.owner?.username}</span>
                            </Owner>
                        </ScheduleEntry>
                        <Line />
                    </React.Fragment>
                ))
            }
            <Explore>
                Explore more rooms
            </Explore>
        </Card>
    );
};