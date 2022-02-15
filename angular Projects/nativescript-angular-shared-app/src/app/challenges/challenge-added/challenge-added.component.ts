import { Router, ActivatedRoute } from '@angular/router';
import { Challenge } from './../challenge.model';
import { Component, OnInit } from '@angular/core';

import { ChallengeService } from '../challenge.service';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
    selector:'ns-challenge-added',
    templateUrl:'./challenge-added.component.html',
    styleUrls:['./challenge-added.component.css']
})
export class ChallengeAddedComponent implements OnInit{

    public isCreating:boolean = true;
    public title = '';
    public description = '';
    public isLoading:boolean = false;
    
    constructor(
        private activatedRoute:ActivatedRoute,
        private router: Router,
        private challengeService:ChallengeService){

    }

    ngOnInit(){
        this.activatedRoute.paramMap.subscribe(paramMap => {
                if(!paramMap.has('mode')){
                    this.isCreating = true;
                }else{
                    this.isCreating = paramMap.get('mode') != 'edit';
                }
                if(!this.isCreating){
                    this.challengeService.currentChallenge
                    .pipe(take(1),switchMap(currentChallenge => {
                        if(!currentChallenge){
                            this.isLoading = true;
                            return this.challengeService.fetchCurrentChallenge();
                        }else{
                            return of(currentChallenge)
                        }
                    }))
                    .subscribe( (challenge:Challenge) => {
                        if(challenge){
                        this.title = challenge.title;
                        this.description = challenge.description;
                        }
                        this.isLoading = false;
                    })
                }else{
                    this.title = this.description = '';
                }
            });            
    }

    onSubmit(title:string, description:string){
       console.log("title "+title+" desc "+description);
       if(this.isCreating)
       { 
            this.challengeService.createNewChallenge(title,description).subscribe(res => {
                this.router.navigate(['/challengs/current-challenge']);
            });
       }else{
           this.challengeService.updateChallenge(this.title,this.description).subscribe(res => {
            this.router.navigate(['/challengs/current-challenge']);
        });;
       }
       
    }
}