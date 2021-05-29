import { Authorize } from "../library/auth/Authorize";
import { useUser } from "../library/auth/useUser";
import { Grid } from "../components/grid/grid";
import { Search } from "../components/search/search";
import styled from 'styled-components';
import { Card } from "../components/card/card";
import Link from "next/link";

const Column = styled.div`
    margin-top: 30px;
`;

const Dashboard = Authorize({
    SEO: () => ({
        title: 'Dashboard2',
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
                    <Card padding>
                        Hey
                    </Card>
                </Column>
                <Column>
                    <Search />
                </Column>
                <Column>
                    <Card padding>
                        Hello {user?.id}
                        <Link href="/profile">Profile</Link>
                    </Card>
                </Column>
            </Grid>
        )
    }
);

export default Dashboard;
