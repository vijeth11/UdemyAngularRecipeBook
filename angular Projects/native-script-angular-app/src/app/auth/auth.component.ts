import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{

   constructor(private router:RouterExtensions){

   }

   onSignIn(){
     this.router.navigate(['/challenges'], { clearHistory: true });     
   }
}
