import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/challenges/today',
      pathMatch: 'full',
  },
  {
      path: 'auth',
      component: AuthComponent,
  },
  {
    path:'challenges',
    loadChildren:() => import('./challenges/challenges.module').then(c => c.ChallengesModule)
  }
];
