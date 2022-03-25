import { LessonEntityService } from './services/lesson-entity.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {CoursesHttpService} from './services/courses-http.service';
import {CourseComponent} from './course/course.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';
import {compareCourses, Course} from './model/course';

import {compareLessons, Lesson} from './model/lesson';
import { CourseEntityService } from './services/course-entity.service';
import { CoursesResolver } from './services/courses.resolver';
import { CourseDataService } from './services/courses-data.service';


export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve:{
      courses: CoursesResolver
    }
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve:{
      courses: CoursesResolver
    }
  }
];

//this is used to create an data map for the Entity which needs to be later registered 
// to provide developers with the CRUD operations It takes some attributes like  SelectId, SortComparer, etc
// which can be provided like we pass in createEntityAdapter
const entityMetadata: EntityMetadataMap = {
  Course:{
    sortComparer: compareCourses,
    // this is made to make update request call to server happen in bacground and in UI the 
    // changes made in edit page should reflect immediately so it will immediately update the STATE
    // By default below option will be false and state will be updated only after successfull backend 
    // call due to which there will be delay in the UI reflecting the changes.
    // There are options for Insert,Delete(default:true),Upsert and SaveAllEntities
    entityDispatcherOptions: {
      optimisticUpdate:true,

    }
  },
  Lesson:{
    sortComparer: compareLessons
  }
};
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes)
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    CourseEntityService,
    LessonEntityService,
    CoursesResolver,
    CourseDataService
  ]
})
export class CoursesModule {

  constructor(private eds:EntityDefinitionService, 
    private entityDataService: EntityDataService, 
    private courseDataService:CourseDataService) {
    this.eds.registerMetadataMap(entityMetadata);
    this.entityDataService.registerService('Course',courseDataService);
  }


}
