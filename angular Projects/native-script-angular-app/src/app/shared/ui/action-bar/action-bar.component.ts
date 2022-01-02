import { RouterExtensions } from '@nativescript/angular';
import { Component, Input } from '@angular/core';
import { Page } from "@nativescript/core/ui/page";
import { isAndroid } from "@nativescript/core/platform";
import { UIService } from '../ui.service';

declare var android:any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {

  @Input() title:string;
  @Input() showBackButton:boolean = true;

  get canGoBack():boolean{
    return this.router.canGoBack() && this.showBackButton;
  }

  onGoBack(){
    this.router.backToPreviousPage();
  }

  constructor(private page:Page, private router:RouterExtensions, private uiService:UIService) { }

  onLoadedActionBar(){
    if(isAndroid){
        console.log("android hello");
        const androidToolbar = this.page.actionBar.nativeView;
        const backButton = androidToolbar.getNavigationIcon();
        if(backButton){
            backButton.setColorFilter(
                android.graphics.Color.parseColor('#FFFFFF'),
                (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
            );
        }
    }
  }

  onToggleMenu(){
    this.uiService.toggleDrawer();
  }
}
