import { User } from './model/user.model';
import { createAction, props } from "@ngrx/store";

export const login = createAction(
    "[Login Page] User Login",   // value inside square bracket tells place it is used and after [] defines the action
    props<{user:User}>()                            // it is good to have this practice as it helps to debug easily
);

export const logout = createAction(
    "[Top Menu] Logout "
)