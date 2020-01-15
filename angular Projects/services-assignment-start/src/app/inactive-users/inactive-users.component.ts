import { UserService } from './../shared/userService/user.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[] = this.userService.inactiveUsers;

  constructor(private userService:UserService){}
  onSetToActive(id: number) {
    this.userService.onSetToActive(id);
  }
}
