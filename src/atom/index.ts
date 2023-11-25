import { atomWithStorage } from "jotai/utils";

const initalData: { isAuth: boolean; token: string | undefined } = {
  isAuth: false,
  token: undefined,
};
export const authAtom = atomWithStorage("authData", initalData);
