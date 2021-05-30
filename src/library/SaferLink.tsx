import React, { FC } from "react";

type Properties = Readonly<{
  target: "external" | "internal";
  href: string;
  className?: string;
  children: React.ReactNode;
}>;

const SaferLink: FC<Properties> = ({ target, href, className, children }: Properties) => {
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
};


export default SaferLink;