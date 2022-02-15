import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { NgModule } from '@angular/core';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@NgModule({
    imports:[    
        CommonModule,
        RouterModule    
    ],
    declarations:[ActionBarComponent,LoadingIndicatorComponent],
    exports:[ActionBarComponent, LoadingIndicatorComponent],
})
export class SharedModule{}