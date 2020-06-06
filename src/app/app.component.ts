import { LoggingService } from './shared/loggingService/logging-service.service';
import { AuthComponent } from './auth/auth.component';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

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
  constructor(private authService:AuthService,private loggerService:LoggingService,@Inject(PLATFORM_ID) private platformid){  
  }
  ngOnInit(){
    if(isPlatformBrowser(this.platformid)){
    this.authService.autoLogin();
    }
    this.loggerService.printLog("Hello from AppComponent on ngOnInit");
  }
}
