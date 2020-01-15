import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {
  
  user: {id: number, name: string};
  paramSubscription:Subscription;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id:this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    }
    this.paramSubscription = this.route.params.subscribe((param:Params)=>{
      this.user = {
        id:param['id'],
        name:param['name']
      };
    });
  }
     
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
