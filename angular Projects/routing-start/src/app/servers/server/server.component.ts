import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    // this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    // this.route.params.subscribe((param:Params)=>{
    //   this.server = this.serversService.getServer(+param['id'])
    // })
    this.route.data.subscribe((data:Data)=>{
      this.server = data['server'];
      console.log(this.server);
    });
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:"preserve"})
  }
}
