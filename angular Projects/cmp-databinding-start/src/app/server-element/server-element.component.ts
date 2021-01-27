import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ServerElementComponent implements 
OnInit
,OnChanges
,DoCheck
,AfterContentInit
,AfterContentChecked
,AfterViewInit
,AfterViewChecked
,OnDestroy {

  @Input('srvElement') element:{type:string,name:string,content:string,createdDate:Date};
  @Input() name: string;
  @ViewChild('headerElement',{static:true}) headerElement:ElementRef;
  @ContentChild('paragraphContent',{static:true}) paragraph:ElementRef;
  constructor() { 
    console.log(this.name);
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges)  {
    console.log("ngOnChanges called!");
    console.log(changes);
  }
  ngOnInit() {
    console.log(this.name);
    console.log("ngOnInit called");
    console.log("header element value :"+this.headerElement.nativeElement.textContent);
    console.log("Paragraph COntent"+this.paragraph.nativeElement.textContent);
  }
 
  ngDoCheck(){
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit called!");
    console.log("Paragraph COntent"+this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called!");
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit called!");
    console.log("header element value :"+this.headerElement.nativeElement.textContent);
  }

  ngAfterViewChecked(){
    console.log("ngAfterViewChecked called!");
  }
   
  ngOnDestroy(){
    console.log("component Destroyed");
  }
}
