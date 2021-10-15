import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnersCourses$:Observable<Course[]>;
    advanceCourses$:Observable<Course[]>;
    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses')
        .pipe(
            map((data:any) => data.payload),
            //share replay will trigger the observable call only once and stores the data in its memory.
            //so when next time user call the observale( ex: http$ ) it returns the same data and does not make an api call in this case.
            shareReplay()
        );
 
        this.beginnersCourses$ = http$.pipe(        
        map((data:any) => data.filter(course => course.category.toLowerCase() == 'beginner'))
        );

        this.advanceCourses$ = http$.pipe(
            map((data:any)=>data.filter(course => course.category.toLowerCase() == 'advanced'))
            );

    }

}
