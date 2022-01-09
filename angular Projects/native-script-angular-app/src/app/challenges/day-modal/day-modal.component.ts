import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {

  loadedDate:Date;
  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
    this.loadedDate = (this.modalParams.context as {date: Date}).date
  }
  
  onHandleInput(action: 'complete'|'fail'|'cancel'){
    this.modalParams.closeCallback(action);
  }
}
