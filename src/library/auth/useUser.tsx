import { atom, selector, useRecoilValue } from "recoil";
import { User } from "../../types/user";

const accessState = atom<string>({
    key: 'access_token',
    default: ''
});

const userState = selector<User | null>({
    key: 'user',
    get: ({get}) => {
        const token = get(accessState);

        return {id: 'Hey ' + token};
    },
});

export const useUser = () => useRecoilValue(userState);