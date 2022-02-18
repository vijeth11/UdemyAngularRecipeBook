import { CourseState } from './reducers/course.reducer';
import { loadAllCourses } from './course.action';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { areCoursesLoaded } from './course.selector';

@Injectable()
export class CourseResolver implements Resolve<any>{

    loading = false;
    constructor(private store:Store<CourseState>){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((coursesLoaded) => {
                if(!this.loading && !coursesLoaded){
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            filter(coursesLoaded => coursesLoaded),
            first(),
            finalize(() => {this.loading = false;})
        );
    }
}