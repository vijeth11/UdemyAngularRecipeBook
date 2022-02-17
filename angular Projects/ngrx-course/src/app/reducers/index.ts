import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
      router: routerReducer  // here the "router" key shoule be same as defined in the StoreRouterConnectingModule in AppModule
};

//META-REDUCERS

// Its is a plain reducer function like AuthReducer only difference is it will be process before other reducers just like middleWares in express
// it gets called for all the actions dispatched in application and it is usefull for applying conditional checks on state before the actual action-reducer
// modifies the state

export  function logger(reducer:ActionReducer<AppState>): ActionReducer<AppState>{
  return (state,action) => {
    console.log("state before: ", state);
    console.log("action", action);
    return reducer(state,action);
  }
}

// order of meta-reducers(middleware-reducers) in the array is the execution order
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
