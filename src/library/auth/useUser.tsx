import { useEffect, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { User } from "../../types/user";

export const accessTokenState = atom<string>({
    key: 'token',
    default: process.browser ? localStorage.getItem('@dh/token') || '' : ''
});


const userSelector = selector<{user: User}>({
    key: 'fds',
    get: () => {
        return {
            user: {
                avatar: '',
                bio: '',
                id: 'd',
                username: 'Rick A'
            }
        }
    }
});

export const useUser = useRecoilValue(userSelector);