import Link from "next/link";
import { FC } from "react";

import { Static } from "../components/static/static";

const Dashboard: FC = () => {
    console.log("Loading dashboard");

    return (
        <>
            <Static/>        
            <div>
                Profile Page
                <Link href="/dashboard">Dashboard</Link>
            </div>
        </>
    );
};

export default Dashboard;
