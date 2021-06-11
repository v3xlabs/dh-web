import { RootState } from "./store";
import { CustomReducerAction } from "./storeTypes";

export enum AuthResourceReducerAction {
    AUTH_RESOURCE_WRITE = "auth_resource/write",
    AUTH_RESOURCE_RESET = "auth_resource/reset",
}

type AuthResourceReducerState = Readonly<{
    token: string;
}>

const initialState: AuthResourceReducerState = { token: "" };

const authResourceReducer = (
    state = initialState,
    action: CustomReducerAction<AuthResourceReducerAction, string>,
): AuthResourceReducerState => {
    switch (action.type) {
    case AuthResourceReducerAction.AUTH_RESOURCE_WRITE:
        return { token: action.payload };
    case AuthResourceReducerAction.AUTH_RESOURCE_RESET:
        return { token: "" };
    default:
        return state;
    }
};

export const getAuthenticationToken = (state: RootState): string => state.authResourceReducer.token;


export default authResourceReducer;