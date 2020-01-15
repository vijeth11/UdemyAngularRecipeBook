import { ServerResolver } from './servers/server/server-resolver.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CanDeactivateGuardService } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes:Routes =[
  { path:'',component:HomeComponent},
  {path:'users',component:UsersComponent,children:[
    {path:':id/:name',component:UserComponent},
  ]},
  
  {path:'servers',component:ServersComponent,
  //canActivate:[AuthGuard],
  canActivateChild:[AuthGuard],
  children:[
    {path:':id/edit',component:EditServerComponent,canDeactivate:[CanDeactivateGuardService]},
    {path:':id',component:ServerComponent,resolve:{server:ServerResolver}},
  ]},
  //{path:'not-found',component:PageNotFoundComponent},
  {path:'not-found',component:ErrorMessageComponent,data:{message:"!Page Not Found"}},
  {path:'**',redirectTo:'not-found'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{useHash:true})],
  exports:[RouterModule]
})
export class ApproutingmodelModule { }
