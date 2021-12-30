import { Component } from '@angular/core'

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  enteredChallenge:string[]=[];

  onChallengeChanged(data:string){
    this.enteredChallenge.push(data);
  }
}
