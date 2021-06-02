import { ReactPortal, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientOnlyPortal({ children, selector }): ReactPortal {
    const reference = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        reference.current = document.querySelector(selector);
        setMounted(true);
    }, [selector]);

    // eslint-disable-next-line unicorn/no-null
    return mounted ? createPortal(children, reference.current) : null;
}
