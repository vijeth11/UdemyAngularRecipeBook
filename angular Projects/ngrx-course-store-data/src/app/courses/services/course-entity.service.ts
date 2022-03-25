import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Course } from "../model/course";

// This service provides developer with functionality to retrieve data from backend and save it in store
// as well as it provides method for interaction with the store
@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course>{

    constructor(serviceElemntFactory:EntityCollectionServiceElementsFactory){
        super('Course',serviceElemntFactory);
    }
}
