import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { reducers, metaReducers } from './reducers';
import { AuthGaurd } from './auth/auth.gaurd';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate:[AuthGaurd]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, { 
      metaReducers, 
      runtimeChecks:{
        strictStateImmutability:true, // throws error if reducer tries to update the state
        strictActionImmutability:true, // throws error if store changes action object
        strictActionSerializability:true, // Make sure the data of action is serializable for ex: Date value is not serializable throws error
        strictStateSerializability:true, // throws error if state is not serializable
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey:'router',  // to sync the Ui with store time-travelling debug we need to add a 
      routerState: RouterState.Minimal  // new attribute in state which stores routes state so debugger can use it and
                        // show the changes in UI as and when state changes refer Ngrx Development Tools of udemy ngrx course
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
