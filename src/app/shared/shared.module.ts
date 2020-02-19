import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-Spinner/loading-spinner.component";
import { AlertCompoenet } from "./alert/alert.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { DropDownDirective } from "./drop-down.directive";

@NgModule({
    declarations:[
    LoadingSpinnerComponent,
    AlertCompoenet,
    PlaceHolderDirective,
    DropDownDirective,
    ],
    imports:[
        CommonModule
    ],
    exports:[
    LoadingSpinnerComponent,
    AlertCompoenet,
    PlaceHolderDirective,
    DropDownDirective,
    CommonModule
    ],
    entryComponents:[AlertCompoenet]
})
export class SharedModule {}