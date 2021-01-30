import { ShoppingService } from './../../shopping.service';
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemSuccessAction, AddItemAction, AddItemFailureAction, RemoveItemAction, RemoveItemSuccessAction, RemoveItemFailureAction } from './../actions/shopping.action';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from'@ngrx/effects';
import { mergeMap , map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShoppingEffects{

    @Effect() loadShopping$ = this.action$.
    pipe(
        ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
        mergeMap(()=> this.shoppingService.getShoppingItems().
            pipe(
                map(data => new LoadShoppingSuccessAction(data)),
                catchError(error => of(new LoadShoppingFailureAction(error)))
            )   
        )
    );

    @Effect() addShoppingItem$ = this.action$.
    pipe(
        ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
        mergeMap((data)=> this.shoppingService.addShoppingItem(data.payload).
        pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError((error) => of(new AddItemFailureAction(error)))
        ))
    );

    @Effect() removeShoppingItem$ = this.action$.
    pipe(
        ofType<RemoveItemAction>(ShoppingActionTypes.REMOVE_ITEM),
        mergeMap((data) => this.shoppingService.deleteShoppingItem(data.payload).
        pipe(
            map(() => new RemoveItemSuccessAction(data.payload)),
            catchError((error) => of(new RemoveItemFailureAction(error)))
        ))
    );

    constructor(private action$:Actions, private shoppingService:ShoppingService){

    }
}