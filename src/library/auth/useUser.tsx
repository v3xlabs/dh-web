import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { User } from "../../types/user";

export const accessTokenState = atom<string>({
    key: 'token',
    default: process.browser ? localStorage.getItem('@dh/token') || '' : ''
});