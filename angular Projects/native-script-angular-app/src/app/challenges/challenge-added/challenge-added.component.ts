import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from '@nativescript/angular';

@Component({
    selector:'ns-challenge-added',
    templateUrl:'./challenge-added.component.html',
    styleUrls:['./challenge-added.component.css']
})
export class ChallengeAddedComponent implements OnInit{

    public isCreating:boolean = true;
    constructor(private activated:ActivatedRoute,private pageRoute:PageRoute, private router: RouterExtensions){

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
            });
        });
    }

    onSubmit(title:string, description:string){
       console.log("title "+title+" desc "+description); 
       this.router.backToPreviousPage();
    }
}