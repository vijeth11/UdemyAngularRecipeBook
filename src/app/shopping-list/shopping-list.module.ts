import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports:[
        RouterModule.forChild([{path:'',component:ShoppingListComponent}]),
        FormsModule,
        SharedModule
    ],
    exports:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ]
})
export class ShoppingListModule {}