import useMediaQuery from "@material-ui/core/useMediaQuery";
import { FC } from "react";
import styled, { useTheme } from "styled-components";

import { Button } from "../../components/button/Button";


const RoomCard = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`;


const RoomHeader = styled.div`
    padding: 2rem;
    border-bottom: 1px;
    text-overflow: ellipsis;
    border-bottom: 0.5px solid  ${({ theme }) => theme.palette.primary[600]};
`;

const Title = styled.div`
    display: block;
    text-overflow: ellipsis;
    font-size: 1.8rem;
    font-weight: 600;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const SubTitle = styled.div`
    display: block;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[400]};
    span {
        margin-left: 1rem;
        color: ${({ theme }) => theme.palette.primary[100]};
    }
`;

const Description = styled.div`
    display: block;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    font-weight: 600;
    padding-top: 0.5rem;
    margin-top: 2rem;
    color: ${({ theme }) => theme.palette.primary[200]};
`;

const RoomActions = styled.div`
    display: flex;
    padding: 2rem;
    background-color: ${({ theme }) => theme.palette.primary[700]};
    border-radius: 0 0 1rem 1rem;
    Button {
        :first {
            
        }
        padding-top: 2rem;
        padding-bottom: 2rem;
        background-color: ${({ theme }) => theme.palette.primary[800]};
        margin-right: 1rem;
        margin-left: 1rem;
    }
`;

const RoomMembers = styled.div`
    flex: 1;
`;

export const MainRoomComponent: FC = () => {

    const theme = useTheme();
    const one = useMediaQuery(`(min-width:${theme.breakpoints.one + 1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two + 1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    const roomName = "RoomName";
    const ownerName = "Owner";
    const roomDescription = "this is the main room description";

    return (
    
        <RoomCard>
            <RoomHeader>
                <Title>{roomName}</Title>
                <SubTitle>
                    with
                    <span>{ownerName}</span>
                </SubTitle>
                <Description>{roomDescription}</Description>
            </RoomHeader>
            <RoomMembers>

            </RoomMembers>
            <RoomActions>
                <Button><img src="/microphone.svg" alt="Microphone Button" /></Button>
                <Button><img src="/headphone.svg" alt="Headphone  Button" /></Button>
                <Button><img src="/settings.svg" alt="Settings Button" /></Button>
                <Button><img src="/users-plus.svg" alt="Invite Button" /></Button>
                <Button>Leave</Button>
            </RoomActions>
        </RoomCard>

    );

};
