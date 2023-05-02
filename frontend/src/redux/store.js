import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./reducers/AuthRedux";
import ProfileReducer from "./reducers/ProfileRedux";
import DarkModeReducer from "./reducers/DarkModeRedux";
import CartReducer from "./reducers/CartRedux";
import ProductReduer from "./reducers/ProductRedux";
import SalesReducer from "./reducers/SalesRedux";
import UserReducer from "./reducers/UserRedux";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth: AuthReducer,
	user: UserReducer,
	profile: ProfileReducer,
	theme: DarkModeReducer,
	cart: CartReducer,
	product: ProductReduer,
	sale: SalesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export let persistor = persistStore(store);
