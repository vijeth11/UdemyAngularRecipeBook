import { Page } from '@nativescript/core/ui/page';
import { RouterExtensions } from '@nativescript/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css']
})
export class ChallengeTabsComponent implements OnInit {

  constructor(private router:RouterExtensions, private active: ActivatedRoute, private page:Page) { }

  ngOnInit(): void {
    // the outlet object contains value of name attribute in page-router-outlet as key and part of the path as it value so that it can
    // load required components for both the page-router-outlets simultaniously and render anyone of them when this component is loaded 
    // no need to add complete path we can use relative to attribute
    this.router.navigate([{
      outlets:{
        currentChallenge:['current-challenge'],
        today:['today']
      }
    }],
    {
      relativeTo:this.active
    });
    this.page.actionBarHidden = true;
  }

}
