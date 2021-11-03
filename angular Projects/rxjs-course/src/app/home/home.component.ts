import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import { Store } from '../common/store.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnersCourses$:Observable<Course[]>;
    advanceCourses$:Observable<Course[]>;
    constructor(private store: Store) {

    }

    ngOnInit() {
 
        this.beginnersCourses$ =this.store.selectBegginersCourse();

        this.advanceCourses$ = this.store.selectAdvancedCourse()

    }

}


