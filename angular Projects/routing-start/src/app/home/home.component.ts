import { AuthorizationService } from './../authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private authService:AuthorizationService) { }

  ngOnInit() {
  }
  onLoadServer(id:number){
    //complexoperations done
    this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'},fragment:'loading'});
  }
  Login(){
    this.authService.login();
  }

  Logout(){
    this.authService.logout();
  }
}
