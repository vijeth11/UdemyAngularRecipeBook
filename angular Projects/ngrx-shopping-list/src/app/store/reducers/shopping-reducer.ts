import { ShoppingAction, ShoppingActionTypes } from "../actions/shopping.action";
import { adapter, ShoppingState } from "../entity/shopping-entity";


const initialState: ShoppingState = adapter.getInitialState({
    loading:false,
    error: undefined
});


export function ShoppingReducer(state: ShoppingState = initialState, action: ShoppingAction){
    switch(action.type){
        case ShoppingActionTypes.LOAD_SHOPPING:
            return {
                ...state,
                loading: true
            };
        case ShoppingActionTypes.LOAD_SHOPPING_SUCCESS:
            return adapter.addMany(action.payload,{
                ...state,
                loading:false
            });
        case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ShoppingActionTypes.ADD_ITEM:
            return {
                ...state,
                loading: true
            };
        case ShoppingActionTypes.ADD_ITEM_SUCCESS:
            return adapter.addOne(action.payload,{
                ...state,
                loading:false
            });
        case ShoppingActionTypes.ADD_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ShoppingActionTypes.REMOVE_ITEM:
            return {
                ...state,
                loading: true
            };
        case ShoppingActionTypes.REMOVE_ITEM_SUCCESS:
            return adapter.removeOne(action.payload,{
                ...state,
                loading: false
            });
        case ShoppingActionTypes.REMOVE_ITEM_FAILURE:
            return{
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}