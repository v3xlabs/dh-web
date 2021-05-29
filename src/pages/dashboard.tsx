import { Authorize } from "../library/auth/Authorize";
import { useUser } from "../library/auth/useUser";
import { Grid } from "../components/grid/Grid";
import { Search } from "../components/search/Search";
import styled, { useTheme } from 'styled-components';
import { Logo } from "../components/logo/Logo";
import { Schedule } from "../components/schedule/Schedule";
import { ProfileWidget } from "../components/user/ProfileWidget";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Column = styled.div`
    margin-top: 30px;
`;

const Dashboard = Authorize({
    SEO: () => ({
        title: 'Dashboard',
        description: 'Description2',
        openGraph: {
            title: 'Dashboard',
            type: 'website',
            description: 'Description'
        }
    })
},
    () => {
        console.log('Loading dashboard')
        // const user = useUser();
        const theme = useTheme();
        const one = useMediaQuery(`(min-width:${theme.breakpoints.one}px)`);
        const two = useMediaQuery(`(min-width:${theme.breakpoints.two}px)`);
        const three = useMediaQuery(`(min-width:${theme.breakpoints.three}px)`);

        return (
            <Grid>
                {
                    one &&
                    <Column>
                        <Logo small={!three}/>
                    </Column>
                }
                <Column>
                    <Search />
                </Column>
                {
                    two &&
                    <Column>
                        <ProfileWidget />
                        <Schedule />
                    </Column>
                }
            </Grid >
        )
    }
);

export default Dashboard;
