import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnLess]'
})
export class UnLessDirective {
  @Input('appUnLess') set unLess(condition){
      if(!condition){
       this.vcRef.createEmbeddedView(this.templateRef);
      }else {
        this.vcRef.clear();
      }
  }
  constructor(private templateRef:TemplateRef<any>,private vcRef:ViewContainerRef) { }

}
