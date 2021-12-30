import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector:'ns-challenge-added',
    templateUrl:'./challenge-added.component.html',
    styleUrls:['./challenge-added.component.css']
})
export class ChallengeAddedComponent{
    
public challengeTitleData:string;
@Output() data = new EventEmitter<string>();

 onSetChallenge(){
     this.data.emit(this.challengeTitleData);
 }
}