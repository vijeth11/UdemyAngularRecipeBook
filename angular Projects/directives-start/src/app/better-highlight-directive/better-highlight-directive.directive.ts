import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';
import { NgModuleResolver } from '@angular/compiler';

@Directive({
  selector: '[appBetterHighlightDirective]'
})
export class BetterHighlightDirectiveDirective implements OnInit{

  @Input() defaultColor:string = 'transparent';
  @Input('appBetterHighlightDirective') highlightColor:string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  constructor(private eleRef:ElementRef,private render:Renderer2) { }

  ngOnInit(){
     this.backgroundColor=this.defaultColor;
  }
 @HostListener('mouseenter') mouseOver(eventData:Event){
  //this.render.setStyle(this.eleRef.nativeElement,'backgroundColor','blue');
  this.backgroundColor=this.highlightColor;
}
 @HostListener('mouseleave') mouseLeave(eventData:Event){
  //this.render.setStyle(this.eleRef.nativeElement,'backgroundColor','transparent');
  this.backgroundColor=this.defaultColor;
 }
}
