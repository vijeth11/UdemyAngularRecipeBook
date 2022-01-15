import { DayStatus } from './../day.model';
import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui/ui.service';
import { DayModalComponent } from './../day-modal/day-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ModalDialogService } from '@nativescript/angular';
import { ViewContainerRef } from '@angular/core';
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
    styleUrls:[
    './current-challenge.component.common.css',
    './current-challenge.component.css']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy{

    weekDays:string[] = ['S','M','T','W','T','F','S'];
    currentChallenge:Challenge;
    private currentChallengeSub:Subscription;

    constructor(
        private router:RouterExtensions, 
        private modalDialog:ModalDialogService, 
        private uiService:UIService, 
        private vcRef:ViewContainerRef,
        private challengeService:ChallengeService){}

    ngOnInit(): void {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe( challenge => {
            this.currentChallenge = challenge;
        });
    }

    editChallenge(){
        this.router.navigate(['/challenges/edit'],{transition:{name:"slideLeft"}});
    }

    onChangeStatus(day:Day){
        if(!this.getIsSettable(day.dayInMonth)){
            return;
        }
        this.modalDialog.showModal(DayModalComponent, { 
            fullscreen: true, 
            viewContainerRef: this.uiService.rootVcRef ?? this.vcRef,
            context: { date: day.date, chosen: this.challengeService.getActionName(day.status) } 
        }).then((status:DayStatus) => {
            if(status === DayStatus.Open){
                return;
            }
            this.challengeService.updateDayStatus(day.dayInMonth,status)
        });
    } 
   
    getRow(index:number, day:{dayInMonth: number, dayInWeek: number}):number{
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(new Date().getFullYear(),new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
        return startRow + weekRow + irregularRow;
    }

    getIsSettable(dayInMonth:number){
        return dayInMonth <= new Date().getDate();
    }

    ngOnDestroy(){
        if(this.currentChallengeSub){
            this.currentChallengeSub.unsubscribe();
        }
    }
}