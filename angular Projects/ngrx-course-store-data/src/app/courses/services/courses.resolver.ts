import { filter, first, map, tap } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class CoursesResolver implements Resolve<boolean>{

    constructor(private courseService:CourseEntityService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        // this makes a backend call by guessing the REST endpoint for retrieving data starts from /api and uses plural name of the entity
        // in the below example it assumes the backend endpoint in /api/courses and expects an array. This can be changed accordingly both
        // the URL and response format by using a service called DataService provided by ngrx
        return this.courseService.loaded$
        .pipe(
            tap(loaded => {
                if(!loaded){
                    // this loads data to courses entity
                    this.courseService.getAll();
                }
            }),
            filter(loaded =>  !!loaded),
            // makes this observable call only once and does not keep observing once done
            first()
        );
         
    }
}