import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAuthState = createFeatureSelector<AuthState>("auth");
//memoized function
export const isLoggedIn = createSelector(
    selectAuthState, // until this expression returns a different value below exprression will
    // not execute and trigger the observable. this type of methods is called memoization function.
    (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);