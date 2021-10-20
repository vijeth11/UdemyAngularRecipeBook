import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import { 
    catchError, 
    delayWhen, 
    map, 
    retryWhen, 
    shareReplay, 
    tap,
    filter, 
    concatMap,
    finalize,
    delay 
} from 'rxjs/operators';
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
            // this creates a seperate thread and altering response here does not alter main response
            tap(() => console.log("Http request completed")),
            map((data:any) => data.payload),
            //share replay will trigger the observable call only once and stores the data in its memory.
            //so when next time user call the observale( ex: http$ ) it returns the same data and does not make an api call in this case.
            shareReplay(),
            /* Use catch and finalize when you dont want to retry and display error message to user else use retry
            // provide an alternatibe http request throws 300,400,500 series errors
            catchError(err => {
                throwError(err);
                return of([]);
            }),
            //call a specified function when the source terminates on complete or error
            finalize(() => {
                console.log("Finalize was called");
            }),*/
            //call the http observable until no error message is retrieved or max 2 times
            retryWhen(error => error.pipe(
                delay(2000), take(2), concatMap((err) => throwError(err))
            ))
        );
 
        this.beginnersCourses$ = http$.pipe(        
        map((data:any) => data.filter(course => course.category.toLowerCase() == 'beginner'))
        );

        this.advanceCourses$ = http$.pipe(
            map((data:any)=>data.filter(course => course.category.toLowerCase() == 'advanced'))
            );

    }

}
function take(arg0: number): import("rxjs").OperatorFunction<unknown, any> {
    throw new Error('Function not implemented.');
}

