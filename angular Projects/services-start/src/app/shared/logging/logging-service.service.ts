import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logStatusChange(message : string)
  {
    console.log(message);
  }
}
