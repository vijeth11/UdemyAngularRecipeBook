import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicHighlightDirective]'
})
export class BasicHighlightDirectiveDirective implements OnInit {

  constructor(private elementRef:ElementRef) { }
  
  ngOnInit(){
    this.elementRef.nativeElement.style.backgroundColor='green';
  }
}
