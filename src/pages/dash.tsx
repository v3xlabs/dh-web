import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextSeo } from "next-seo";
import React from "react";
import styled, { useTheme } from "styled-components";

import { FriendsList } from "../components/friends/FriendsList";
import { Grid } from "../components/grid/Grid";
import { Logo } from "../components/logo/Logo";
import { Rooms } from "../components/rooms/Rooms";
import { ScheduleDataContainer } from "../components/schedule/Schedule";
import { Search } from "../components/search/Search";
import { ProfileIconDataContainer } from "../components/user/ProfileIcon";
import { ProfileWidgetDataContainer } from "../components/user/ProfileWidget";
import { withAuth } from "../library/auth/withAuth";

const Column = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-rows: 4rem 640px;
    row-gap: 60px;
`;

const ProfileWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const SearchWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 2rem;
`;

function Dashboard() {
    const theme = useTheme();
    const one = useMediaQuery(`(min-width:${theme.breakpoints.one + 1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two + 1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);

    return (
        <>
            <NextSeo
                defaultTitle="Dogehouse Revived"
                title="Dashboard | Dogehouse Revived"
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
                    <div>
                        <Rooms />
                    </div>
                </Column>
                {
                    two &&
                    <Column>
                        <ProfileWrapper>
                            <ProfileIconDataContainer />
                        </ProfileWrapper>
                        <div>
                            <ProfileWidgetDataContainer />
                            <ScheduleDataContainer />
                        </div>
                    </Column>
                }
            </Grid >
        </>
    );
}

export default withAuth(Dashboard);
