import dynamic from "next/dynamic";
import React, { FC } from "react";

const NoSSR: FC<{children: React.ReactNode}> = ({children}: {children: React.ReactNode}) => (
    <React.Fragment>
        {children}
    </React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false
});