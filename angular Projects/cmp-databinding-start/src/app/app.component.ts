import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type:"server",name:"test",content:"test",createdDate:this.getCurrentDate()}];

  onServerAdded(data:{serverName:string,content:string}) {
    this.serverElements.push({
      type: 'server',
      name: data.serverName,
      content: data.content,
      createdDate:this.getCurrentDate()
    });
  }

  onBlueprintAdded(data:{serverName:string,content:string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: data.serverName,
      content: data.content,
      createdDate:this.getCurrentDate()
    });
  }

  getCurrentDate():Date{
    return new Date();
  }

  onChangeFirst(){
   this.serverElements[0].name="Changed!";
  } 
  
  onDestroyFirst(){
   this.serverElements.splice(0,1);
  }
}
