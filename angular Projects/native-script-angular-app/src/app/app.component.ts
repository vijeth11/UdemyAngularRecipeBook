import { ViewChild, ViewContainerRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { Subscription } from 'rxjs';
import { UIService } from './shared/ui/ui.service';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild(RadSideDrawerComponent) radSideDrawer:RadSideDrawerComponent;
  enteredChallenge:string[]=[];
  private drawerSub:Subscription;
  private drawer:RadSideDrawer;
  
  constructor(private uiService:UIService,private changeDetectorRef:ChangeDetectorRef, private vcRef:ViewContainerRef){}

  onChallengeChanged(data:string){
    this.enteredChallenge.push(data);
  }

  ngOnInit(){
    this.drawerSub = this.uiService.drawerState.subscribe((data) => {
      if(this.drawer){
        this.drawer.toggleDrawerState();
      }
    })
  }

  ngOnDestroy(){
    this.drawerSub.unsubscribe();
  }


  ngAfterViewInit(){
    this.drawer = this.radSideDrawer.sideDrawer;
    this.changeDetectorRef.detectChanges();
    this.uiService.setRootVCRef(this.vcRef);
  }

  onLogout(){
    this.uiService.toggleDrawer();
  }
}
