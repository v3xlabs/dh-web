import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextSeo } from "next-seo";
import { FC } from "react";
import styled, { useTheme } from "styled-components";

import { FriendsList } from "../../components/friends/FriendsList";
import { Grid } from "../../components/grid/Grid";
import { Input } from "../../components/inputs/input";
import { Logo } from "../../components/logo/Logo";
import { MainRoomComponent } from "../../components/rooms/MainRoomComponent";
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

const ChatCard = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
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

const Room: FC = () => {

    // const router = useRouter();
    // const { roomId } = router.query;

    const theme = useTheme();
    const one = useMediaQuery(`(min-width:${theme.breakpoints.one + 1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two + 1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    const roomName = "roomName";

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
                    <MainRoomComponent/>
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