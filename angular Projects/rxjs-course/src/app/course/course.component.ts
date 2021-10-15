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
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    courseId = 0;
    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {
        this.courseId = this.route.snapshot.params['id'];
    }

    ngOnInit() {

        

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
        

    }

    ngAfterViewInit() {

        const searchLessons$= fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            map((event:any)=> event.target.value),
            // waits for 400 seconds from first emitted value if any value is emitted apart from first it will 
            // start timer again for new value and discard the first value. after 400 if any value emitted it will
            // be considered as new value
            debounceTime(400),
            // removes duplicate values
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search))
        )
        const initalLessons$ = this.loadLessons();
        this.lessons$ = concat(initalLessons$,searchLessons$);
    }


    loadLessons(search = ''):Observable<Lesson[]>{
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
        .pipe(map((res:any) => res.payload));
    }

}
