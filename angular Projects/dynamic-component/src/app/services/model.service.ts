import { ModelComponent } from './../shared/model/model.component';
import { ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private closeCall:EventEmitter<any>|undefined;
  private componentRef: ComponentRef<any>|undefined;
  constructor(private resolver:ComponentFactoryResolver) { }

  showModel(vcRef:ViewContainerRef,component:any):Promise<any>{
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(ModelComponent);
    this.componentRef  = vcRef.createComponent(factory);
    this.componentRef.instance.component = component;
    
    //componentRef.instance.context = context;
    this.closeCall = (this.componentRef.instance.closeEvent as EventEmitter<any>);
    return this.closeCall.asObservable().pipe(tap(() => {
      this.destroyModal();
    })).toPromise();
  }

  closeCallBack(data:any = null){
    this.closeCall?.emit(data);
    this.destroyModal();
  }

  destroyModal(){
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.closeCall?.complete()
    this.closeCall = undefined;
  }

}
