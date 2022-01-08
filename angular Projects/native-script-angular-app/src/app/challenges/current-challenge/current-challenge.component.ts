import { UIService } from './../../shared/ui/ui.service';
import { DayModalComponent } from './../day-modal/day-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ModalDialogService } from '@nativescript/angular';
import { ViewContainerRef } from '@angular/core';

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
export class CurrentChallengeComponent implements OnInit{

    weekDays:string[] = ['S','M','T','W','T','F','S'];
    days:{dayInMonth: number, dayInWeek: number}[] = [];
    private currentMonth:number;
    private currentYear:number;
    constructor(private router:RouterExtensions, private modalDialog:ModalDialogService, private uiService:UIService, private vcRef:ViewContainerRef){}

    ngOnInit(): void {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth(); 
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        for(let i=1 ; i< daysInMonth+1;i++){
            const date = new Date(this.currentYear,this.currentMonth, i);
            const dayInWeek = date.getDay();
            this.days.push({dayInMonth: i, dayInWeek: dayInWeek});
        }  
    }

    editChallenge(){
        this.router.navigate(['/challenges/edit'],{transition:{name:"slideLeft"}});
    }

    onChangeStatus(){
        this.modalDialog.showModal(DayModalComponent, { 
            fullscreen: true, 
            viewContainerRef: this.uiService.rootVcRef ?? this.vcRef,
            context: { date: new Date() } 
        }).then((action:string) => {
            console.log(action);
        });
    } 
   
    getRow(index:number, day:{dayInMonth: number, dayInWeek: number}):number{
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(this.currentYear,this.currentMonth, 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
        return startRow + weekRow + irregularRow;
    }
}