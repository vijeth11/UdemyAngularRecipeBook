import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private arrayNumbers:Number[]=[];

  displayNumber(data:{newNumber:Number,createArray:boolean}){
    if(data.createArray){
      this.createEmptyArray();
    }
    this.arrayNumbers.push(data.newNumber);
  }

  createEmptyArray(){
    this.arrayNumbers=[];
  }
}
