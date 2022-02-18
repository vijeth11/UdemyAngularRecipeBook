import { allCoursesLoaded } from './../course.action';
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseAction } from "../course-action.types";
import { compareCourses, Course } from "../model/course";

export interface CourseState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    //selectId: course => course.id //this needs to ber added only when model does not have id attribute and uses a different attribute as id like courseId 
});

export const initialCoursesState = adapter.getInitialState({allCoursesLoaded:false});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseAction.allCoursesLoaded, (state:CourseState,action) => {
        // all state changes needs to be done before calling adapter and updated state needs to be passed to
        // the entity adapter
        let newState = {...state, allCoursesLoaded:true};
        return adapter.addAll(action.courses,newState);        
    })
);

export const selectors = adapter.getSelectors();