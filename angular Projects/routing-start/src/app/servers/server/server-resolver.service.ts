import { ServersService } from './../servers.service';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

interface service{
    id:number;
    name:string;
    status:string;
}
@Injectable()
export class ServerResolver implements Resolve<service>{
    constructor(private ServiceServer:ServersService) {
        
    }
    resolve(route:ActivatedRouteSnapshot,
            state:RouterStateSnapshot):Observable<service>|Promise<service>|service{
     return this.ServiceServer.getServer(+route.params['id']);  
    }
}