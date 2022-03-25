import { CourseEntityService } from './../services/course-entity.service';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$:Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private courseEntityService:CourseEntityService) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {

    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    if(this.mode == 'update'){
      // this uses conventional url built by itself based on generic structure i.e '/api/course/:id'
      // If we need to use customised url we need to update courses-data.service in this ex or any other service 
      // which is registered with the entityDataService or custom urlGenerator
      this.courseEntityService.update(course);
      this.dialogRef.close();
    }
    else if(this.mode == 'create'){
      // no need to subscribe in general until you need to do some operation after the api call
      // in below example we are doing the closing of dialog after the successfull insert of new course
      // but we dont need to subscribe in general
      this.courseEntityService.add(course)
      .subscribe( newCourse => {
          console.log("New Course", newCourse);
          this.dialogRef.close();
      });      
    }
  }


}
