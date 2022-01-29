import { NativeScriptCommonModule } from '@nativescript/angular';
import { ChallengeActionsComponent } from './challenge-actions.component';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

@NgModule({
    imports:[NativeScriptCommonModule],
    declarations:[ChallengeActionsComponent],
    exports:[ChallengeActionsComponent],
    schemas:[NO_ERRORS_SCHEMA]
})
export class ChallengeActionsModule{}