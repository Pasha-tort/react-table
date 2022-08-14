import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './reducers';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type Selector<S> = (state: RootState) => S;