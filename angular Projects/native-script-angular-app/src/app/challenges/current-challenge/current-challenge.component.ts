import { UIService } from './../../shared/ui/ui.service';
import { DayModalComponent } from './../day-modal/day-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ModalDialogService } from '@nativescript/angular';
import { ViewContainerRef } from '@angular/core';

@Component({
    selector:'ns-current-challenge',
    templateUrl:'./current-challenge.component.html',
    styleUrls:['./current-challenge.component.css']
})
export class CurrentChallengeComponent{

    constructor(private router:RouterExtensions, private modalDialog:ModalDialogService, private uiService:UIService, private vcRef:ViewContainerRef){}
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
   
}