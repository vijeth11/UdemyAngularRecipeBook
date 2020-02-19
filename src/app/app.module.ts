import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { RecipeModule } from './recipes/recipe.module';
import { AlertCompoenet } from './shared/alert/alert.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecipeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [ShoppingListService,RecipeService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
