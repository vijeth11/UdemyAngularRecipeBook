import { DisplayMessageComponent } from './display-message/display-message.component';
import { ModelService } from './services/model.service';
import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-component';

  constructor(private vcRef:ViewContainerRef,private modalService:ModelService){}
  displayModal(){
    this.modalService.showModel(this.vcRef,DisplayMessageComponent).then(
      () => {
        console.log("module closed");
      }
    );
  }
}
