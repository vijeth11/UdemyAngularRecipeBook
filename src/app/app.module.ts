import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //RecipeModule as this is lazy loaded,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer}),
    //ShoppingListModule,
    SharedModule
  ],
  providers: [ShoppingListService,RecipeService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
