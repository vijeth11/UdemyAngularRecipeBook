import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.css']
})
export class ChallengeActionsComponent implements OnInit {

  @Output() actionSelected = new EventEmitter<'complete'|'fail'|'cancel'>();
  @Input() cancelText:string = "cancel";
  constructor() { }

  ngOnInit(): void {
  }

  onAction(action:'complete' | 'fail' | 'cancel'){
    this.actionSelected.emit(action);
  }
}
