import { Tutorial } from './../models/tutorial.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './../app.state';
import { Store } from '@ngrx/store'
import * as TutorialActions from './../actions/tutorial.actions';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  tutorials: Observable<Tutorial[]>;

  constructor(private store: Store<AppState>) {
    this.tutorials = this.store.select('tutorial');
   }

   delTutorial(index){
     this.store.dispatch(new TutorialActions.RemoveTutorial(index));
   }
  ngOnInit() {
  }

}