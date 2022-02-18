import { allCoursesLoaded } from './course.action';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseAction } from "./course-action.types";
import { CoursesHttpService } from "./services/courses-http.service";
import { Course } from './model/course';

@Injectable()
export class CoursesEffects{
    
    loadCourses$ = createEffect(
        () => this.action$.pipe(
            ofType(CourseAction.loadAllCourses),
            concatMap(() => this.coursesService.findAllCourses()),
            map(courses => allCoursesLoaded({courses}))
        )
    );

    saveCourse$ = createEffect(
        () => this.action$.pipe(
            ofType(CourseAction.courseUpdated),
            concatMap(action => this.coursesService.saveCourse(action.update.id, action.update.changes))
        ), {dispatch: false}
    )
    constructor(private action$:Actions, private coursesService:CoursesHttpService){}


}