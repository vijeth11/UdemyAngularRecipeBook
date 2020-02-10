import { AuthComponent } from './auth/auth.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // constructor(private route:Router){}
  // loadFeature:string = 'recipe'
  // onNavigate(feature:string){
  //   this.route.navigate([feature]);
  // }
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.autoLogin();
  }
}
