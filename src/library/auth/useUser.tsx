import { atom, } from "recoil";

export const accessTokenState = atom<string>({
    key: "token",
    default: process.browser ? localStorage.getItem("@dh/token") || "" : ""
});