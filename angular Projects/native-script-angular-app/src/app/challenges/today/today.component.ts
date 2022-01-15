import { DayStatus } from './../day.model';
import { Subscription } from 'rxjs';
import { Challenge } from './../challenge.model';
import { ChallengeService } from './../challenge.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Day } from '../day.model';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit,OnDestroy{
 
  public currentDay:Day;
  private currentChallengeSub:Subscription;

 constructor(private challengeService:ChallengeService){

 }

 get status(){
   return this.challengeService.getActionName(this.currentDay.status);
 }
 
 ngOnInit(){
  this.currentChallengeSub = this.challengeService.currentChallenge.subscribe((currentChallenge:Challenge)=>{
    if(currentChallenge){
      this.currentDay = currentChallenge.currentDate;
    }
  });
 }

 onActionSelected(action:DayStatus){
   this.challengeService.updateDayStatus(this.currentDay.dayInMonth,action)
 }

 ngOnDestroy(): void {
    if(this.currentChallengeSub){
      this.currentChallengeSub.unsubscribe();
    }
 }
}
