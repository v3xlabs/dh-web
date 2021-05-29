import { Authorize } from "../library/auth/Authorize";
import { useUser } from "../library/auth/useUser";
import { Grid } from "../components/grid/Grid";
import { Search } from "../components/search/Search";
import styled, { useTheme } from 'styled-components';
import { Logo } from "../components/logo/Logo";
import { Schedule } from "../components/schedule/Schedule";
import { ProfileWidget } from "../components/user/ProfileWidget";
import Media from 'react-media';
import { useMediaQuery } from "react-responsive";

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
        const matches3 = useMediaQuery({ query: `(min-width: ${theme.breakpoints.three}px)` })
        const matches = useMediaQuery({ query: `(min-width: ${theme.breakpoints.two}px)` })
        const matches2 = useMediaQuery({ query: `(min-width: ${theme.breakpoints.one}px)` });

        return (
            <Grid>
                <Column>
                    {
                        matches2 ? (
                            matches3 &&
                            <Logo /> || <Logo small={true} />
                        ) : null
                    }
                </Column>
                <Column>
                    <Search />
                </Column>
                {
                    matches &&
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
