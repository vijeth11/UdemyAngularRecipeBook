import { ShoppingState, adapter } from './../entity/shopping-entity';
import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppState } from '../models/app-state.models';

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} =  adapter.getSelectors();

export const selectCustomer = createFeatureSelector<AppState,ShoppingState>('shoppings')

export const selectLoading = createSelector(
    selectCustomer,
    (shopping) => shopping.loading
)


export const selectError = createSelector(
    selectCustomer,
    (shopping) => shopping.error)

export const selectShoppingItems  = createSelector(
    selectCustomer,
    selectAll
    );