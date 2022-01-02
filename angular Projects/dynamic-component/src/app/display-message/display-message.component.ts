import { ModelService } from './../services/model.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  constructor(private modelService:ModelService) { }

  ngOnInit(): void {
  }

  onSave(){
    this.modelService.closeCallBack();
  }

}
