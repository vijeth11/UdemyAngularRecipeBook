import * as fromApp from '../../store/app.reducer';
import { Ingredients } from './../../shared/ingredients.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import * as shoppingListAction from "../store/shopping-list.actions";
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

 // @ViewChild('nameInput',{static:true}) nameInputRef:ElementRef;
 // @ViewChild('amountInput',{static:true}) amountInputRef:ElementRef;
 // @Output() newIngredientAdded:EventEmitter<Ingredients> = new EventEmitter<Ingredients>(); replaced with service
 @ViewChild('f',{static:false}) slForm:NgForm;
 subscription:Subscription;
 editMode:boolean = false;
 editedItemIndex:number;
 editedItem: Ingredients;
  constructor(
    private shoppingListService:ShoppingListService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode=true;
        //this.editedItemIndex = stateData.editedIngredientIndex; this becomes redundant as we are using the same to update and delete items
        this.editedItem= stateData.editedIngredient;
        this.slForm.setValue({
          'name':this.editedItem.name,
          'amount':this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    });
    /*this.subscription=this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          'name':this.editedItem.name,
          'amount':this.editedItem.amount
        });
      }
    )*/
  }

  onSubmitItem(form:NgForm){
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;
    //const newIngrident = new Ingredients(ingName,ingAmount);
    //this.newIngredientAdded.emit(newIngrident); replace with service
    const value = form.value;
    const newIngrident = new Ingredients(value.name, value.amount);
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editedItemIndex,newIngrident);
      this.store.dispatch(new shoppingListAction.UpdateIngredient(newIngrident)); // removed editingridentIndex as we can take them from state
    }else{
    //this.shoppingListService.addIngredient(newIngrident);
    this.store.dispatch(new shoppingListAction.AddIngredient(newIngrident));
    }
    this.onClearItem();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListAction.StopEdit());
  }
  onClearItem(){
    this.slForm.reset();
    this.editMode = false;
    this.editedItemIndex = -1;
    this.store.dispatch(new shoppingListAction.StopEdit());
  }
  onDeleteItem(){
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new shoppingListAction.DeleteIngredient()); // removed editingridentIndex as we can take them from state
    this.onClearItem();
  }
}
