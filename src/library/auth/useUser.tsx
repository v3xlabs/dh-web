import { atom, DefaultValue, } from "recoil";

import { UnSafeLocalStorageProvider } from "../data/unSafeLocalStorageHelper";

/* Do not modify this. */
const localStorageEffect = key => ({ setSelf, onSet }) => {
    const unSafeLocalStorageProvider = UnSafeLocalStorageProvider.create();
    const savedValue = process.browser ? unSafeLocalStorageProvider.get(key) : "";
    // eslint-disable-next-line unicorn/no-null
    if (savedValue != null) {
        setSelf(savedValue);
    }

    onSet(newValue => {
        if (process.browser) {
            if (newValue instanceof DefaultValue) {
                unSafeLocalStorageProvider.remove(key);
            } else {
                unSafeLocalStorageProvider.set(key, newValue);
            }
        }
    });
};

export type AccessTokenStateType = Readonly<{
    token?: string
}>;

export const accessTokenState = atom<AccessTokenStateType>({
    key: "token",
    default: { token: "" },
    effects_UNSTABLE: [
        localStorageEffect("@dh/token"),
    ]
});
