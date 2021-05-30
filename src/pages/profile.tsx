import Link from "next/link";

const Dashboard = () => {
    console.log('Loading dashboard')

    return (
        <div>
            Profile Page
            <Link href="/dashboard">Dashboard</Link>
        </div>
    )
};

export default Dashboard;
