import {Component, Output, EventEmitter} from '@angular/core';
@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    private collapsed:boolean = true;
    // @Output() featureSelected:EventEmitter<String>=new EventEmitter<String>();
    // onSelect(feature:string){
    //     this.featureSelected.emit(feature);
    // }
}