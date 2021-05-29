import Link from "next/link";
import { Authorize } from "../library/auth/Authorize";
import { useUser } from "../library/auth/useUser";

const Dashboard = Authorize({
    SEO: () => ({
        title: 'Profile',
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
            <div>
                Profile Page {JSON.stringify(user)}
                <Link href="/dashboard">Dashboard</Link>
            </div>
        )
    }
);

export default Dashboard;
