import { atom, selector, useRecoilValue } from "recoil";
import { User } from "../../types/user";

// const accessState = atom<string>({
//     key: 'access_token',
//     default: ''
// });

const userState = selector<User | null>({
    key: 'user',
    get: () => {
        // const token = get(accessState);

        return {
            id: '1234',
            username: 'Rick A',
            avatar: 'https://comicvine.gamespot.com/a/uploads/square_medium/7/72009/1310816-rick_astley.jpg',
            bio: 'Never gonna give you up!'
        };
    },
});

export const useUser = () => useRecoilValue(userState);