import { DayStatus } from './../day.model';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {

  loadedDate:Date;
  chosen:'complete' | 'fail'=null;
  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
    let params = (this.modalParams.context as {date: Date, chosen: 'complete' | 'fail'});
    this.loadedDate = params.date;
    this.chosen = params.chosen;
  }
  
  onHandleInput(action: DayStatus){
    this.modalParams.closeCallback(action);
  }
}
