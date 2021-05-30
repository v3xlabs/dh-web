import React from "react";

type Props = Readonly<{
  target: "external" | "internal";
  href: string;
  className?: string;
  children: React.ReactNode;
}>;

function SaferLink({ target, href, className, children }: Props) {
  const targetStr = (target === "external") ? "__blank" : "";

  return (
    <a
      rel="noreferrer noopener"
      className={className}
      target={targetStr}
      href={href}
    >
      { children}
    </a >
  );
}


export default SaferLink;