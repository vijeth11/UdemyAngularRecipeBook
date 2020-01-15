import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  newServerName:string = '';
  newServerContent = '';
  @Output() newServer:EventEmitter<{serverName:string,content:string}> = new EventEmitter<{serverName:string,content:string}>();
  @Output('newBpAdded') newBluePrint:EventEmitter<{serverName:string,content:string}> = new EventEmitter<{serverName:string,content:string}>();
  @ViewChild('serverContentData',{static: false}) serverContentData:ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onAddServer(data:HTMLInputElement) {
    this.newServer.emit({
     // serverName:this.newServerName,
     serverName: data.value,
     // content:this.newServerContent
     content:this.serverContentData.nativeElement.value
    });
  }

  onAddBlueprint(data:HTMLInputElement) {
    this.newBluePrint.emit({
      //serverName:this.newServerName,
      serverName:data.value,
      //content:this.newServerContent
      content:this.serverContentData.nativeElement.value
    });
  }

}
