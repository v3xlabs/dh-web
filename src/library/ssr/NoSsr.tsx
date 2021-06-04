import dynamic from "next/dynamic";
import React from "react";

type NoSSRProperties = Readonly<{
    children: React.ReactNode
}>

function NoSSR({ children }: NoSSRProperties) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false
});