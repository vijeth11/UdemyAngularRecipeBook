import { AccountsService } from './shared/accounts/accounts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private accounts:{name:string,status:string}[] = [];
  constructor(private accountService:AccountsService){
   this.accounts = accountService.accounts;
  }
}
