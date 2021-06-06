import useMediaQuery from "../library/hooks/useMediaQuery";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { FC } from "react";
import styled, { useTheme } from "styled-components";

import { Button } from "../../components/button/Button";
import { FriendsList } from "../../components/friends/FriendsList";
import { Grid } from "../../components/grid/Grid";
import { Input } from "../../components/inputs/input";
import { Logo } from "../../components/logo/Logo";
import { Search } from "../../components/search/Search";
import { ProfileIconDataContainer } from "../../components/user/ProfileIcon";
import { withAuth } from "../../library/auth/withAuth";

const SearchWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 2rem;
`;

const ProfileWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const Column = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-rows: 4rem 640px;
    row-gap: 60px;
`;

const RoomCard = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`;

const ChatCard = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
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

const RoomHeader = styled.div`
    padding: 2rem;
    border-bottom: 1px;
    text-overflow: ellipsis;
    border-bottom: 0.5px solid  ${({ theme }) => theme.palette.primary[600]};
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

const ChatWarper = styled.div`
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    overflow-y: auto;
`;

const MessageSender = styled.span`
    color: red;
    ::after {
        content: ":";
        color: ${({ theme }) => theme.palette.primary[100]};
    }
`;

const MessageContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Microphone = () => { return (<svg data-testid="mic-off" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#solid-microphone-off_svg__clip0)" fill="currentColor"><path d="M15.758 14.636l-2.718-2.717a6.338 6.338 0 001.353-3.91h-1.598c0 .994-.313 1.963-.894 2.77L10.743 9.62a3.138 3.138 0 00.454-1.612V3.213C11.197 1.442 9.77 0 8.017 0a.74.74 0 00-.167.02 3.201 3.201 0 00-3.047 3.193v.469L1.373.25.243 1.38l14.385 14.385 1.13-1.13zM3.205 8.008H1.607c0 3.255 2.445 5.943 5.594 6.339V16h1.598v-1.653a6.34 6.34 0 001.791-.504l-1.238-1.237c-.439.13-.894.197-1.352.197a4.8 4.8 0 01-4.795-4.795z"></path><path d="M4.81 8.062A3.194 3.194 0 007.946 11.2L4.809 8.062z"></path></g><defs><clipPath id="solid-microphone-off_svg__clip0"><path fill="currentColor" d="M0 0h16v16H0z"></path></clipPath></defs></svg>);};

const Headphone = () => {
    return (<svg data-testid="headphone-on" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.5414 2.33786C12.0154 0.852143 9.99572 0 8 0C6.00429 0 3.98464 0.852143 2.45857 2.33786C0.873214 3.88107 0 5.89286 0 8C0 8.9525 0.3125 10.1818 1.17429 12.4839C2.03607 14.7861 3.75 15.75 4.47393 15.9075C4.68143 15.9529 4.92464 16 5.14286 16C5.51887 16.0003 5.88836 15.9018 6.21429 15.7143L6.71429 15.4286C7.2525 15.1136 7.40964 14.4239 7.1 13.8804L3.99571 8.43143C3.92174 8.30104 3.82264 8.18663 3.70414 8.09481C3.58564 8.003 3.4501 7.93561 3.30537 7.89654C3.16064 7.85748 3.0096 7.84752 2.86099 7.86724C2.71239 7.88696 2.56917 7.93597 2.43964 8.01143L1.95071 8.29714C1.7628 8.40723 1.59395 8.54701 1.45071 8.71107C1.43294 8.73193 1.40953 8.74724 1.38329 8.75516C1.35706 8.76309 1.32909 8.7633 1.30274 8.75577C1.27638 8.74824 1.25275 8.73329 1.23466 8.7127C1.21657 8.69211 1.20479 8.66675 1.20071 8.63964C1.16472 8.42827 1.14537 8.2144 1.14286 8C1.14286 6.20321 1.89286 4.48286 3.25571 3.15679C4.57143 1.87679 6.29964 1.14286 8 1.14286C9.70036 1.14286 11.4286 1.87679 12.7443 3.15679C14.1071 4.48286 14.8571 6.20321 14.8571 8C14.8539 8.21446 14.8339 8.42833 14.7971 8.63964C14.7931 8.66675 14.7813 8.69211 14.7632 8.7127C14.7451 8.73329 14.7215 8.74824 14.6951 8.75577C14.6688 8.7633 14.6408 8.76309 14.6146 8.75516C14.5883 8.74724 14.5649 8.73193 14.5471 8.71107C14.4039 8.54701 14.2351 8.40723 14.0471 8.29714L13.5582 8.01143C13.4287 7.93597 13.2855 7.88696 13.1369 7.86724C12.9883 7.84752 12.8372 7.85748 12.6925 7.89654C12.5478 7.93561 12.4122 8.003 12.2937 8.09481C12.1752 8.18663 12.0761 8.30104 12.0021 8.43143L8.9 13.8804C8.59036 14.4239 8.7475 15.1136 9.28572 15.4286L9.78572 15.7143C10.1116 15.9018 10.4811 16.0003 10.8571 16C11.0754 16 11.3186 15.9529 11.5261 15.9075C12.25 15.75 13.9643 14.7857 14.8257 12.4839C15.6871 10.1821 16 8.9525 16 8C16 5.89286 15.1268 3.88107 13.5414 2.33786Z"></path></svg>);
};

const Settings = () => {
    return (<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.075 8.8c.041-.24.041-.52.041-.8s-.04-.52-.04-.8l1.717-1.32c.164-.12.205-.32.082-.52L14.24 2.6c-.082-.16-.327-.24-.491-.16l-2.046.8c-.409-.32-.9-.6-1.39-.8L10.024.32a.438.438 0 00-.41-.32H6.344a.438.438 0 00-.41.32l-.326 2.12c-.491.2-.941.48-1.392.8l-2.045-.8c-.205-.08-.41 0-.491.16L.042 5.36c-.081.16-.04.4.082.52l1.76 1.32c0 .28-.041.52-.041.8s.04.52.04.8L.166 10.12c-.164.12-.205.32-.082.52L1.72 13.4c.082.16.327.24.491.16l2.046-.8c.409.32.9.6 1.39.8l.328 2.12c.04.2.204.32.409.32h3.273c.204 0 .368-.16.409-.32l.327-2.12c.491-.2.941-.48 1.391-.8l2.046.8c.204.08.409 0 .49-.16l1.637-2.76c.082-.16.041-.4-.082-.52l-1.8-1.32zm-6.096 2c-1.595 0-2.863-1.24-2.863-2.8 0-1.56 1.268-2.8 2.863-2.8 1.596 0 2.864 1.24 2.864 2.8 0 1.56-1.268 2.8-2.864 2.8z"></path></svg>);
};

const UserPlus = () => {
    return (<svg width="20" height="20" viewBox="0 0 20 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 8C14.2002 8 16 6.19996 16 4C16 1.80004 14.2002 0 12 0C9.79979 0 8 1.80004 8 4C8 6.19996 9.79979 8 12 8ZM12 10C9.35008 10 4 11.3501 4 14V16H20V14C20 11.3501 14.6499 10 12 10ZM4 6.66667V4H2.66667V6.66667H0V8H2.66667V10.6667H4V8H6.66667V6.66667H4Z"></path></svg>);
};

const Room: FC = () => {

    // const router = useRouter();
    // const { roomId } = router.query;

    const theme = useTheme();
    const one = useMediaQuery(`(min-width:${theme.breakpoints.one + 1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two + 1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);
    
    const roomName = "RoomName";
    const ownerName = "Owner";
    const roomDescription = "this is the main room description";

    return (
        <>
            <NextSeo
                defaultTitle="Dogehouse Revived"
                title={`${roomName} | Dogehouse Revived` }
                description="Taking voice conversations to the moon 🚀"
                additionalLinkTags={[
                    {
                        rel: "icon",
                        href: "https://cdn.lvk.sh/dogehouse/logo.svg",
                    },
                    {
                        rel: "apple-touch-icon",
                        href: "https://cdn.lvk.sh/dogehouse/logo.svg",
                        sizes: "76x76"
                    }
                ]}
            />
            <Grid>
                {
                    one &&
                    <Column>
                        <Logo small={!three} />
                        <FriendsList />
                    </Column>
                }
                <Column>
                    <SearchWrapper>
                        <Search/>
                        {!two && <ProfileIconDataContainer />}
                    </SearchWrapper>
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
                            <Button><Microphone/></Button>
                            <Button><Headphone /></Button>
                            <Button><Settings /></Button>
                            <Button><UserPlus /></Button>
                            <Button>Leave</Button>
                        </RoomActions>
                    </RoomCard>
                </Column>
                {
                    two &&
                    <Column>
                        <ProfileWrapper>
                            <ProfileIconDataContainer />
                        </ProfileWrapper>
                        <ChatCard>
                            <ChatContainer>
                                {/* { arr.each((msg)=>{ */}
                                <MessageContainer>
                                    <MessageSender>
                                        {"4nkitd"}
                                    </MessageSender>
                                    {"msd"}
                                </MessageContainer>
                                {/* }) */}
                            </ChatContainer>
                            <ChatWarper>
                                <Input placeholder="Room Name" />
                            </ChatWarper>
                        </ChatCard>
                    </Column>
                }
            </Grid>
        </>
    );
};

export default withAuth(Room);