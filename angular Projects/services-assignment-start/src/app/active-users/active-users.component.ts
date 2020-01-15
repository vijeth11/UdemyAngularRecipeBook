import { UserService } from './../shared/userService/user.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  users: string[] = this.userService.activeUsers;

  constructor(private userService:UserService){}
  onSetToInactive(id: number) {
    this.userService.onSetToInactive(id);
  }
}
