import { DayStatus } from './../day.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {

  loadedDate:Date;
  chosen:'complete' | 'fail'=null;
  @Input() selectedDate:Date;
  @Input() selectedStatus: DayStatus;
  @Output() actionSelect = new EventEmitter<DayStatus>();
  constructor() { }

  ngOnInit(): void {    
   this.loadedDate = this.selectedDate;
    if(this.selectedStatus === DayStatus.Completed){
      this.chosen = 'complete';
    }else if(this.selectedStatus === DayStatus.Failed){
      this.chosen = 'fail';
    }else{
      this.chosen = null;
    }
  }
  
  onHandleInput(action: DayStatus){
   this.actionSelect.emit(action);
  }
}
