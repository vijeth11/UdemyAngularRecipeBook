import { Injectable } from "@angular/core";
import { Course } from '../model/course';
import {BehaviorSubject, interval, noop, Observable, of, throwError, timer} from 'rxjs';
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
    delay, 
    take
} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';   
import { fromPromise } from "rxjs/internal-compatibility";

@Injectable({
    providedIn:'root'
})
export class Store{
    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable();

    public init(){
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
        )
        .subscribe((courses:Course[]) => {
            this.subject.next(courses);
        });
    }

    selectBegginersCourse():Observable<Course[]>{
        return this.filterByCategory('beginner');
    }

    selectAdvancedCourse():Observable<Course[]>{
        return this.filterByCategory('advanced');
    }

    selectCourseById(courseId:Number):Observable<Course>{
        return this.courses$.pipe(
            map((data:any)=>data.find(course => course.id == courseId)),
            filter(course => !!course)
            );
    }

    filterByCategory(category:string):Observable<Course[]>{
        return this.courses$.pipe(
            map((data:any)=>data.filter(course => course.category.toLowerCase() == category))
            );
    }

    saveCourse(courseId:number,changes):Observable<any>{
        const courses = this.subject.getValue();
        const courseIndex = courses.findIndex(course => course.id == courseId);
        const newCourses = [...courses];
        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...changes
        };
        this.subject.next(newCourses);
        return fromPromise(fetch(`/api/courses/${courseId}`,{
            method:'PUT',
            body:JSON.stringify(changes),
            headers:{
                'content-type':'application/json'
            }
        }));
    }
}