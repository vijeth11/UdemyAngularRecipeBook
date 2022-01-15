import { DayStatus } from './../day.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.css']
})
export class ChallengeActionsComponent implements OnInit, OnChanges {

  @Output() actionSelected = new EventEmitter<DayStatus>();
  @Input() cancelText:string = "cancel";
  @Input() chosen:'complete' | 'fail' = null;
  public done:boolean=false;
  public action:'complete' | 'fail' | 'cancel' = null;
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
     if(changes.chosen){
       this.action = changes.chosen.currentValue;
       this.done = !!this.action && this.cancelText !== "cancel";
     } 
  }

  onAction(action:'complete' | 'fail' | 'cancel'){
    this.done = true;
    let status = DayStatus.Open;
    if(action === 'complete'){
      status = DayStatus.Completed;
    }else if(action === 'fail'){
      status = DayStatus.Failed
    }
    this.action = action === "cancel" ? null : action;
    this.done = !!this.action && this.cancelText !== "cancel"; 
    this.actionSelected.emit(status);
  }
}
