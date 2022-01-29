import { DayStatus } from './../day.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';
import { Day } from '../day.model';
/*
current-challenge.component.css does not exist in this directory so native script will 
automatically fetch for android and ios css files for this component in this directory.
*/
@Component({
    selector:'ns-current-challenge',
    templateUrl:'./current-challenge.component.html',
    styleUrls:['./current-challenge.component.css']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy{

    selectedDay: Day;
    isLoading:boolean = false;
    weekDays:string[] = ['S','M','T','W','T','F','S'];
    currentChallenge:Challenge;
    private currentChallengeSub:Subscription;

    constructor(
        private router:RouterExtensions, 
        private challengeService:ChallengeService){}

    ngOnInit(): void {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe( challenge => {
            this.currentChallenge = challenge;
        });
        this.isLoading = true;
        this.challengeService.fetchCurrentChallenge().subscribe(res => {
            console.log("Fetching data");
            this.isLoading = false;
          },(err) => {
            console.log(err);
            this.isLoading = false;
          });
    }

    editChallenge(){
        this.router.navigate(['/challenges/edit'],{transition:{name:"slideLeft"}});
    }

    onChangeStatus(day:Day){
        if(!this.getIsSettable(day.dayInMonth)){
            this.selectedDay = day;
            return;
        }        
    } 
   
    getRow(index:number, day:{dayInMonth: number, dayInWeek: number}):number{
        const startRow = 2;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(new Date().getFullYear(),new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
        return startRow + weekRow + irregularRow;
    }

    getIsSettable(dayInMonth:number){
        return dayInMonth <= new Date().getDate();
    }

    onUpdateStatus(selectedStatus:DayStatus){
        if(selectedStatus === DayStatus.Open){
            this.selectedDay = null;
            return;
        }
        this.challengeService.updateDayStatus(this.selectedDay.dayInMonth, selectedStatus);
        this.selectedDay = null;
    }

    ngOnDestroy(){
        if(this.currentChallengeSub){
            this.currentChallengeSub.unsubscribe();
        }
    }
}