import { CustomReducerAction } from "./storeTypes";

export enum AuthResourceReducerAction {
    AUTH_RESOURCE_WRITE = "auth_resource/write",
    AUTH_RESOURCE_RESET = "auth_resource/reset",
}

const initialAuthResourceReducerState = { token: "" };

const authResourceReducer = (
    state = initialAuthResourceReducerState,
    action: CustomReducerAction<AuthResourceReducerAction, string>,
) => {
    switch (action.type) {
    case AuthResourceReducerAction.AUTH_RESOURCE_WRITE:
        return { token: action.payload };
    case AuthResourceReducerAction.AUTH_RESOURCE_RESET:
        return { token: "" };
    default:
        return state;
    }
};

export const getAuthenticationToken = state => state.authResourceReducer.token;


export default authResourceReducer;