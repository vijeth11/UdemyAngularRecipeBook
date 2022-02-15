import { AuthService } from './../../../auth/auth.service';
import { Component, Input } from '@angular/core';
import { UIService } from '../ui.service';


@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {

  @Input() title:string;  
  @Input() hasChallenge:boolean = false;
  constructor(private authService:AuthService) { }

  onLogout(){
    this.authService.logout();
  }
    
}
