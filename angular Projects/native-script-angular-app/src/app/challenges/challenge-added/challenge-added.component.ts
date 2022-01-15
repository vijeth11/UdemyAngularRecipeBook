import { Challenge } from './../challenge.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from '@nativescript/angular';
import { ChallengeService } from '../challenge.service';
import { take } from 'rxjs';

@Component({
    selector:'ns-challenge-added',
    templateUrl:'./challenge-added.component.html',
    styleUrls:['./challenge-added.component.css']
})
export class ChallengeAddedComponent implements OnInit{

    public isCreating:boolean = true;
    public title = '';
    public description = '';
    
    constructor(
        private pageRoute:PageRoute, 
        private router: RouterExtensions,
        private challengeService:ChallengeService){

    }

    ngOnInit(){
        // activated route will not be called if this page is poped out of stack of pages 
        // due to which we will not get the changed param map so we need to use activatedroute inside pageroute 
        // refer to Lecure 98 "Reading Dynamic Parameters"
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(paramMap => {
                if(!paramMap.has('mode')){
                    this.isCreating = true;
                }else{
                    this.isCreating = paramMap.get('mode') != 'edit';
                }
                if(!this.isCreating){
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe( (challenge:Challenge) => {
                        this.title = challenge.title;
                        this.description = challenge.description;
                    })
                }
            });
        });
    }

    onSubmit(title:string, description:string){
       console.log("title "+title+" desc "+description);
       if(this.isCreating)
       { 
            this.challengeService.createNewChallenge(title,description);
       }else{
           this.challengeService.updateChallenge(this.title,this.description);
       }
       this.router.backToPreviousPage();
    }
}