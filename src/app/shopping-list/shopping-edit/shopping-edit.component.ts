import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

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
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          'name':this.editedItem.name,
          'amount':this.editedItem.amount
        });
      }
    )
  }

  onSubmitItem(form:NgForm){
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;
    //const newIngrident = new Ingredients(ingName,ingAmount);
    //this.newIngredientAdded.emit(newIngrident); replace with service
    const value = form.value;
    const newIngrident = new Ingredients(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngrident);
    }else{
    this.shoppingListService.addIngredient(newIngrident);
    }
    this.onClearItem();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onClearItem(){
    this.slForm.reset();
    this.editMode = false;
    this.editedItemIndex = -1;
  }
  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearItem();
  }
}
