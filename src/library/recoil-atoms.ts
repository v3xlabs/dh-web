import { atom, RecoilState } from "recoil";

export const randomItemState: RecoilState<string> = atom({
  key: "randomItem",
  default: "Poo Poo Pee Pee. Caca Pee Pee",
});
