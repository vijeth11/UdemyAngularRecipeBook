import { CourseEntityService } from './../services/course-entity.service';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { LessonEntityService } from '../services/lesson-entity.service';
import { of } from 'rxjs';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private lessonService: LessonEntityService,
    private courseService:CourseEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.courseService.entities$.pipe(
      map(courses => 
        courses.find(course => course.url == courseUrl)
      )
    );

    this.lessons$ = this.lessonService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lessons,course]) =>{
        if(this.nextPage == 0){
          this.loadLessonsPage(course)
        }
      }),
      map(([lessons,course]) => lessons.filter(
        lesson => 
        lesson.courseId == course.id
      ))
    )

    this.loading$ = this.lessonService.loading$.pipe(delay(0));
  }


  loadLessonsPage(course: Course) {
    // This loads data to the lessons entity
    this.lessonService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize':'3',
    })
    this.nextPage += 1;
  }

}
