//import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';
import { DayModalComponent } from './challenges/day-modal/day-modal.component.tns';
import { UIService } from './shared/ui/ui.service';
import { AuthComponent } from './auth/auth.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { SharedModule } from './shared/ui/shared.module.tns';
import { ReactiveFormsModule } from '@angular/forms';


// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,    
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    //ChallengeActionsModule
  ],
  providers: [UIService],
  bootstrap: [AppComponent],
  entryComponents:[DayModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
