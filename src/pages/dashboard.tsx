import { Grid } from "../components/grid/Grid";
import { Search } from "../components/search/Search";
import styled, { useTheme } from 'styled-components';
import { Logo } from "../components/logo/Logo";
import { Schedule } from "../components/schedule/Schedule";
import { ProfileWidget } from "../components/user/ProfileWidget";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NoSSR from "../library/ssr/NoSSR";
import { useAuth } from "../library/auth/useAuth";
import { ProfileIcon } from "../components/user/ProfileIcon";
import { Rooms } from "../components/rooms/Rooms";
import { FriendsList } from "../components/friends/FriendsList";

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
    const one = useMediaQuery(`(min-width:${theme.breakpoints.one+1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two+1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three+1}px)`);

    return (
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
                    { !two && <ProfileIcon /> }
                </SearchWrapper>
                <div>
                    <Rooms />
                </div>
            </Column>
            {
                two &&
                <Column>
                    <ProfileWrapper>
                        <ProfileIcon />
                    </ProfileWrapper>
                    <div>
                        <ProfileWidget />
                        <Schedule />
                    </div>
                </Column>
            }
        </Grid >
    )
}

export default useAuth(Dashboard);
