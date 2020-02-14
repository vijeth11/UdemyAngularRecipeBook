import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector:'app-alert',
    templateUrl:'./alert.component.html',
    styleUrls:['./alert.component.css']
})

export class AlertCompoenet{
    @Input() message:String;
    @Output() close :EventEmitter<void> = new EventEmitter<void>();

    onClose(){
        this.close.emit();
    }
}