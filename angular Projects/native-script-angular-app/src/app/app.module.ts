import { AppRoutingModule } from './app-routing.module';
import { GridComponent } from './layout/grid/grid.component';
import { FlexboxComponent } from './layout/flexbox/flexbox.component';
import { StackComponent } from './layout/stack/stack.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { ChallengeAddedComponent }from './challenges/challenge-added/challenge-added.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TodayComponent } from './challenges/today/today.component';


@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    CurrentChallengeComponent,
    StackComponent,
    FlexboxComponent,
    GridComponent,
    ChallengeAddedComponent,
    AuthComponent,
    TodayComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
