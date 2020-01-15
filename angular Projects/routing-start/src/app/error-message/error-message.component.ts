import { ActivatedRouteSnapshot, Data, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  errorMessage:string=null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() { 
    this.errorMessage = this.route.snapshot.data['message']
    this.route.data.subscribe((data:Data)=>{
      this.errorMessage= data['message'];
    });
  }

}
