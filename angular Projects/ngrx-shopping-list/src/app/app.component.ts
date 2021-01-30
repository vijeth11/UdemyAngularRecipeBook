import { selectShoppingItems, selectLoading, selectError } from './store/selectors/shopping-selectors';
import { AddItemAction, LoadShoppingAction, RemoveItemAction } from './store/actions/shopping.action';
import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/models/app-state.models';
import { ShoppingItem } from './store/models/shopping-item.model';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  shoppingItems:Observable<Array<ShoppingItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  newShoppingItem:ShoppingItem = {id:'',name:''};

  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    /* shoppping items without selector from entity */
    this.shoppingItems = this.store.select(store => {
      let data = []
      for(var id of store.shoppings.ids){
        data.push(store.shoppings.entities[id]);
      }
      return data;
    });
    //this.shoppingItems = this.store.pipe(select(selectShoppingItems));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));

    this.store.dispatch(new LoadShoppingAction());
  }


  addItem(){
    this.newShoppingItem.id = uuid();
    this.store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = {id:'', name:''};
  }

  removeItem(id:string){
    this.store.dispatch(new RemoveItemAction(id));
  }
}
