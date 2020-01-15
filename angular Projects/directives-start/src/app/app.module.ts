import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BasicHighlightDirectiveDirective } from './basic-hightlight-directive/basic-highlight-directive.directive';
import { BetterHighlightDirectiveDirective } from './better-highlight-directive/better-highlight-directive.directive';
import { UnLessDirective } from './Unless/un-less.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirectiveDirective,
    BetterHighlightDirectiveDirective,
    UnLessDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
