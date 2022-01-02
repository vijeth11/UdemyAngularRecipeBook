import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('content',{read:ViewContainerRef,static:true}) container:ViewContainerRef | undefined;
  public context:any;
  public closeEvent:EventEmitter<any> = new EventEmitter<any>();
  public component:any;
  private componentRef:ComponentRef<any>|undefined;
  constructor(private resolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.component);
    this.componentRef = this.container?.createComponent(factory);    
  }

  onClose(){
    this.closeEvent.emit();
  }

  ngOnDestroy(){
    this.componentRef?.destroy();
  }
}
