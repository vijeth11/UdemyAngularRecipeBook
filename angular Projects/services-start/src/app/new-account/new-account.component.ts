import { AccountsService } from './../shared/accounts/accounts.service';
import { LoggingService } from '../shared/logging/logging-service.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  
  constructor(private logService:LoggingService,private accountService:AccountsService)
  {

  }
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName,accountStatus);
    this.logService.logStatusChange('A server status changed, new status: ' + accountStatus);
  }
}
