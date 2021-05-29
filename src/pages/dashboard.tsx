import { Authorize } from "../library/auth/Authorize";
import { useUser } from "../library/auth/useUser";
import { Grid } from "../components/grid/Grid";
import { Search } from "../components/search/Search";
import styled from 'styled-components';
import { Card } from "../components/card/Card";
import Link from "next/link";
import { Logo } from "../components/logo/Logo";
import { Button } from "../components/button/Button";
import { Schedule } from "../components/schedule/Schedule";
import { ProfileWidget } from "../components/user/ProfileWidget";

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
        const user = useUser();

        return (
            <Grid>
                <Column>
                    <Logo />
                </Column>
                <Column>
                    <Search />
                </Column>
                <Column>
                    <ProfileWidget />
                    <Schedule />
                </Column>
            </Grid>
        )
    }
);

export default Dashboard;
