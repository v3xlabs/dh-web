import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

type ReducerAction<ReduxTypeGeneric, ReduxPayloadGeneric> = {
    type: ReduxTypeGeneric;
    payload: ReduxPayloadGeneric;
};

const initialAuthResourceReducerState = { token: "initial_token" };

export enum AuthResourceReducerAction {
    AUTH_RESOURCE_WRITE = "auth_resource/write",
    AUTH_RESOURCE_RESET = "auth_resource/reset",
}

const authResourceReducer = (
    state = initialAuthResourceReducerState,
    action: ReducerAction<AuthResourceReducerAction, string>,
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

const persistedReducer = persistReducer({
    key: "root",
    storage,
    whitelist: ["authResourceReducer"]
}, combineReducers({ authResourceReducer }));

const composeEnhancers = process.browser &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware()),
);

export const persistor = persistStore(store);

export default store;