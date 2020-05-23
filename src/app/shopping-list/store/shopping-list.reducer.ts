import { Ingredients } from './../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State{
    ingredients:Ingredients[],
    editedIngredient:Ingredients,
    editedIngredientIndex:number
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
            const oldingredient = state.ingredients[state.editedIngredientIndex];
            const updateingredient = {
                ...oldingredient,
                ...action.payload
            };
            const updateingredients=[...state.ingredients];
            updateingredients[state.editedIngredientIndex]=updateingredient;
            return {
                ...state,
                ingredients:updateingredients,
                editedIngredient:null,
                editedIngredientIndex:-1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients:state.ingredients.filter(
                    (ig,igindex)=>{
                        return igindex != state.editedIngredientIndex;
                    }),
                editedIngredient:null,
                editedIngredientIndex:-1
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