import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authResourceReducer from "./authResourceReducer";
import dynamicThemeReducer from "./dynamicThemeReducer";

/**
 * Only Whitelist Reducer groups we want 
 * to cache in localstorage.
 */
const persistedReducer = persistReducer({
    key: "root",
    storage,
    whitelist: ["authResourceReducer", "dynamicThemeReducer"]
}, combineReducers({ authResourceReducer, dynamicThemeReducer }));

const composeEnhancers = process.browser &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware()),
);

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);

export default store;