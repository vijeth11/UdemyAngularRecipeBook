import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  .setcolor{
    color:white;
  }
  `]
})
export class AppComponent {

  private isDisplaySecret:boolean=false;
  private clicks:any[]=[];
  displaySecret()
  {
    this.isDisplaySecret = !this.isDisplaySecret;
    this.clicks.push("clicked at "+new Date());
  }
}
