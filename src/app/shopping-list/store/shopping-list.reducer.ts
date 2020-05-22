import { Ingredients } from './../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State{
    ingredients:Ingredients[],
    editedIngredient:Ingredients,
    editedIngredientIndex:number
}

export interface AppState{
    shoppingList:State
}
const initialState:State ={
    ingredients:[
        new Ingredients('Apples',5),
        new Ingredients('Tomatoes',10),
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
}
export function shoppingListReducer(state:State = initialState,action:ShoppingListActions.shoppingListActions){
  switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
          return {
              ...state,
              ingredients: [...state.ingredients, action.payload]
          };
       case ShoppingListActions.ADD_INGREDIENTS:
           return {
                ...state,
                ingredients:[...state.ingredients, ...action.payload]
           };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const oldingredient = state.ingredients[action.payload.index];
            const updateingredient = {
                ...oldingredient,
                ...action.payload.ingredient
            };
            const updateingredients=[...state.ingredients];
            updateingredients[action.payload.index]=updateingredient;
            return {
                ...state,
                ingredients:updateingredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients:state.ingredients.filter(
                    (ig,igindex)=>{
                        return igindex != action.payload;
                    })
            };
        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editedIngredientIndex:action.payload,
                editedIngredient:{
                    ...state.ingredients[action.payload]
                }
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient : null,
                editedIngredientIndex:-1
            }
       default:
           return state;
  }
}