import { GridComponent } from './layout/grid/grid.component';
import { FlexboxComponent } from './layout/flexbox/flexbox.component';
import { StackComponent } from './layout/stack/stack.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { ChallengeAddedComponent }from './challenges/challenge-added/challenge-added.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';
import { AppComponent } from './app.component';


@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule],
  declarations: [
    AppComponent,
    CurrentChallengeComponent,
    StackComponent,
    FlexboxComponent,
    GridComponent,
    ChallengeAddedComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
