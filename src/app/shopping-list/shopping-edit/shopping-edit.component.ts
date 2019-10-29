import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:true}) nameInputRef:ElementRef;
  @ViewChild('amountInput',{static:true}) amountInputRef:ElementRef;
 // @Output() newIngredientAdded:EventEmitter<Ingredients> = new EventEmitter<Ingredients>(); replaced with service
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngrident = new Ingredients(ingName,ingAmount);
    //this.newIngredientAdded.emit(newIngrident); replace with service
    this.shoppingListService.addIngredient(newIngrident);
  }
}
