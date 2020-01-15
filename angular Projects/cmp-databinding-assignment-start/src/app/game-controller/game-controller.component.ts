import { Component, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {

  private timer:any;
  constructor() { }
  
  @Output() sendNewNumber:EventEmitter<{newNumber:number,createArray:boolean}>=new EventEmitter<{newNumber:number,createArray:boolean}>(); 
  ngOnInit() {
  }

  startCounting(){
   this.sendNewNumber.emit({newNumber:Math.round(Math.random() * 100),createArray:true});
   this.timer = setInterval(()=>{
    this.sendNewNumber.emit({newNumber:Math.round(Math.random() * 100),createArray:false});
    },1000);
     
  }

  stopCounting(){
    clearInterval(this.timer);
  }
}
