import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const IndexPage: FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/dashboard");
    });

    return <></>;
};

export default IndexPage;
