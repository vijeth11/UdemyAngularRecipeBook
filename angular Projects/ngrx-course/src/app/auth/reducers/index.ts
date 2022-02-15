import { User } from './../model/user.model';
import {
  createReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User;
}
export const initialState:AuthState = {
  user: undefined
};


export const authReducer = createReducer(initialState,
  on(AuthActions.login, (state:AuthState, action) => {
    return {...state, user: action.user}
  })
);

