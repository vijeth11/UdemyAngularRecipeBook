import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';
import { SharedModule } from './shared/ui/shared.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { AppRoutingModule } from './app-routing.module';
import { GridComponent } from './layout/grid/grid.component';
import { FlexboxComponent } from './layout/flexbox/flexbox.component';
import { StackComponent } from './layout/stack/stack.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UIService } from './shared/ui/ui.service';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule, 
    NativeScriptFormsModule, 
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    SharedModule,
    ChallengeActionsModule
  ],
  declarations: [
    AppComponent,
    StackComponent,
    FlexboxComponent,
    GridComponent,
    AuthComponent,
    DayModalComponent
  ],
  providers: [UIService],
  entryComponents:[DayModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
