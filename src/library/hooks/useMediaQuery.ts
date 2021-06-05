/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Plucked from
 * https://github.com/beautifulinteractions/beautiful-react-hooks
 */
import { useEffect, useState } from "react";

import isAPISupported from "./utils/isAPISupported";
import isClient from "./utils/isClient";

const errorMessage = "matchMedia is not supported, this could happen both because window.matchMedia is not supported by"
    + " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.<br />
 * It also monitor the document changes to detect when it matches or stops matching the media query.<br />
 * Returns the validity state of the given media query.
 *
 */
const useMediaQuery = (mediaQuery: string): boolean => {
    if (!isClient || !isAPISupported("matchMedia")) {
        // eslint-disable-next-line no-console
        console.warn(errorMessage);
        // eslint-disable-next-line unicorn/no-null
        return null;
    }

    const [isVerified, setIsVerified] = useState(!!window.matchMedia(mediaQuery).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);
        const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

        try {
            mediaQueryList.addEventListener("change", documentChangeHandler);
        } catch (error) {
            //Safari isn't supporting mediaQueryList.addEventListener
            console.error(error);
            mediaQueryList.addListener(documentChangeHandler);
        }

        documentChangeHandler();
        return () => {
            try {
                mediaQueryList.removeEventListener("change", documentChangeHandler);
            } catch (error) {
                //Safari isn't supporting mediaQueryList.removeEventListener
                console.error(error);
                mediaQueryList.removeListener(documentChangeHandler);
            }


        };
    }, [mediaQuery]);

    return isVerified;
};

export default useMediaQuery;