import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {
        this.form.valueChanges
        .pipe(
            filter((value) => this.form.valid), // returns value only if it is valid 
            // executes the observable over the emitted value(ex: changes).Once the observable (ex: saveCourse) is 
            //completed then it takes next emitted value and executes the observable on it again due to this we will 
            //have ordered api calls. 
            concatMap(changes => this.saveCourse(changes)) 
        )
        .subscribe()

    }

    saveCourse(changes){
        return fromPromise(fetch(`/api/courses/${this.course.id}`,{
            method:'PUT',
            body:JSON.stringify(changes),
            headers:{
                'content-type':'application/json'
            }
        }));
    }

    ngAfterViewInit() {
        fromEvent(this.saveButton.nativeElement,'click')
        .pipe(
            exhaustMap(() => this.form.value)
        )
        .subscribe();

    }



    close() {
        this.dialogRef.close();
    }

}
