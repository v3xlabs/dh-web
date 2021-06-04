import React from "react";

type Properties = Readonly<{
    target: "external" | "internal";
    href: string;
    className?: string;
    children: React.ReactNode;
}>;

export default function SaferLink({ target, href, className, children }: Properties): JSX.Element {
    const targetString = (target === "external") ? "__blank" : "";

    return (
        <a
            rel="noreferrer noopener"
            className={className}
            target={targetString}
            href={href}
        >
            { children}
        </a >
    );
}