import { Directive, Input, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  /*@Input('appDropDown') set isOpen(condition){
   if(condition){
     this.render.addClass(this.eleRef.nativeElement,"open");
   }else{
     this.render.removeClass(this.eleRef.nativeElement,"open");
   }
  }*/
  @HostBinding('class.open')isOpen=false;
  @HostListener('click') viewDropDown(){
   this.isOpen=!this.isOpen; 
  }
  constructor(private eleRef:ElementRef,private render:Renderer2) { }

}
