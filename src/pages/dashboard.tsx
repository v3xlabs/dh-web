import { Authorize } from "../library/auth/Authorize";
import { useUser } from "../library/auth/useUser";

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
            <div>Dashboard Page {JSON.stringify(user)}</div>
        )
    }
);

export default Dashboard;
