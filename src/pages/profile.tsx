import Link from "next/link";
import { FC } from "react";

const Dashboard: FC = () => {
    console.log("Loading dashboard");

    return (
        <div>
            Profile Page
            <Link href="/dashboard">Dashboard</Link>
        </div>
    );
};

export default Dashboard;
