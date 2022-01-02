import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelComponent } from './shared/model/model.component';
import { DisplayMessageComponent } from './display-message/display-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    DisplayMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  entryComponents:[ModelComponent,DisplayMessageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
