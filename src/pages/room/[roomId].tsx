import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextSeo } from "next-seo";
import { FC } from "react";
import styled, { useTheme } from "styled-components";

import { ChatBoard } from "../../components/chats/chat";
import { FriendsList } from "../../components/friends/FriendsList";
import { Grid } from "../../components/grid/Grid";
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
                title={`${roomName} | Dogehouse Revived`}
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
                        <Search />
                        {!two && <ProfileIconDataContainer />}
                    </SearchWrapper>
                    <MainRoomComponent />
                </Column>
                {
                    two &&
                    <Column>
                        <ProfileWrapper>
                            <ProfileIconDataContainer />
                        </ProfileWrapper>
                        <ChatBoard />
                    </Column>
                }
            </Grid>
        </>
    );
};

export default withAuth(Room);