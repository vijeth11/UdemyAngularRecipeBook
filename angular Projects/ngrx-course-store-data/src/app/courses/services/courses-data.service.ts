import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Course } from './../model/course';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from 'rxjs';

// This service is used by data entity in order to retrieve the data from backend
// It is only required if the structur of the backend api is not of type generic and it is customised
// Then in order to make request for customized api we can do that in this service which will be used
// by the Entity Data
@Injectable()
export class CourseDataService extends DefaultDataService<Course>{

    constructor(http:HttpClient, httpUrlGenerator:HttpUrlGenerator){
        super('Course',http,httpUrlGenerator);
    }

    getAll(): Observable<Course[]> {
        return this.http.get<Course[]>('/api/courses')
        .pipe(map( res => res["payload"]));
    }
}