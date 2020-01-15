import { AccountsService } from './../shared/accounts/accounts.service';
import { LoggingService } from './../shared/logging/logging-service.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  
  constructor(private logService:LoggingService,private accountService:AccountsService){}
  onSetTo(status: string) {
    this.accountService.updateAccount(this.id,status);
    this.logService.logStatusChange('A server status changed, new status: ' + status);
  }
}
