import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, 
    shareReplay, 
    throttleTime,
    throttle,
    first,
    take
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../common/debug';
import { Store } from '../common/store.service';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    courseId:Number = 0;
    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute, private store:Store) {
        this.courseId = this.route.snapshot.params['id'];
    }

    ngOnInit() {        
        // Below code works useing store service instead
        /*this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
            debug(RxJsLoggingLevel.INFO,"course value "),
        );*/
        this.course$ = this.store.selectCourseById(this.courseId).pipe(
            debug(RxJsLoggingLevel.INFO,"course value "),
            // Subjects observable does not complete due to which some opearators like concatMap, ForkJoin etc
            // will never get completed and blocks the other observable in order to overcome this we use first
            first(),
            // this will take till 2 values emitted by observable then it completes the source observable
            take(2)
        )
        setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG);

        this.loadLessons().
        pipe(
            // this combines the value form source with the latest value of course observable after the loadlesson has 
            // emitted the value. It gives the values in tuple form
            withLatestFrom(this.course$)
        ).subscribe(([lessons,course])=> {
            console.log("lessons ",lessons);
            console.log("course ",course);
        })
    }

    ngAfterViewInit() {
        // key up triggers for every key stroke so instead of calling api for every key stroke
        // it is better take the latest key stroke entery so below operators are used. 
        const searchLessons$= fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            map((event:any)=> event.target.value),
            // emits the value passed as argument for first time and only once as soon as subscribed,
            // using this we can assign lessons$ to fromEvent instead of using concat 
            startWith(''),
            // Custom RxJs Operator 
            debug(RxJsLoggingLevel.TRACE,"search "),
            // waits for 400 seconds from first emitted value if any value is emitted apart from first it will 
            // start timer again for new value and discard the first value. after 400 if any value emitted it will
            // be considered as new value. (Note: the next operator will get value emitter by source only after 400 sec)
            debounceTime(400),
            //emits the source Observable values on the output Observable when its internal timer is disabled, 
            //and ignores source values when the timer is enabled. Initially, the timer is disabled. 
            //As soon as the first source value arrives, it is forwarded to the output Observable, and then the timer is enabled. 
            //After duration milliseconds (or the time unit determined internally by the optional scheduler) has passed, 
            //the timer is disabled, and this process repeats for the next source value. Optionally takes a SchedulerLike for managing timers.
            // Note: (Not good type ahead search)
            //throttleTime(500),
            // removes duplicate values
            distinctUntilChanged(),
            // Projects each source value to an Observable which is merged in the output Observable, 
            // emitting values only from the most recently projected Observable
            switchMap(search => this.loadLessons(search)),
            debug(RxJsLoggingLevel.DEBUG,"lessons value "),
        )
        const initalLessons$ = this.loadLessons();
        this.lessons$ = concat(initalLessons$,searchLessons$);
    }


    loadLessons(search = ''):Observable<Lesson[]>{
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
        .pipe(map((res:any) => res.payload));
    }

}
