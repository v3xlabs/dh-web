import React, { ReactPortal, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ClientOnlyPortalProperties = Readonly<{
  children: React.ReactNode;
  selector: string;
}>;

export default function ClientOnlyPortal(
    { children, selector }: ClientOnlyPortalProperties,
): ReactPortal {
    const reference = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        reference.current = document.querySelector(selector);
        setMounted(true);
    }, [selector]);

    // eslint-disable-next-line unicorn/no-null
    return mounted ? createPortal(children, reference.current) : null;
}
