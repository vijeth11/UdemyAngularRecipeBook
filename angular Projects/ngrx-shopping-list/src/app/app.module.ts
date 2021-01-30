import { ShoppingEffects } from './store/effect/shopping.effect';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ShoppingReducer } from './store/reducers/shopping-reducer';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ //whatever name is give here for reducer, that is used to set same attribute
      shoppings:ShoppingReducer  // in store. Changing here means we need to change in selector as well
    }),                   // as interface used to define the store in constructor of component
    EffectsModule.forRoot([ShoppingEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })                          
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
