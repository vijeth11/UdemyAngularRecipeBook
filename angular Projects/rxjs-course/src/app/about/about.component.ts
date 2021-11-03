import { Component, OnInit } from '@angular/core';
import { AsyncSubject, ReplaySubject, Subject } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const sub = http$.subscribe(console.log);
    // the unsubscribe will cancel the http request by calling controller.abort() in the function returned
    // by the observable in createHttpObservable.
    setTimeout(() => sub.unsubscribe(),0);

    const subject = new Subject();  

    // we convert subject to an observable bcz it can be shared with others and they can only
    // do subscription they cannot call next and emit a new value this works like a security
    const series$ = subject.asObservable();
    series$.subscribe(console.log);

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();

    // async subject will trigger the subscribe with value emited before complete
    //so in below ex: only 3 will be printed bcz that is the last value emitted before complete
    // value 1 and 2 will be discarded 
    const asyncSubject = new AsyncSubject()
    asyncSubject.subscribe(console.log);
    asyncSubject.next(1);
    asyncSubject.next(2);
    asyncSubject.next(3);
    asyncSubject.complete();


    // replay subject will emit all the values again for new subscription. Like in below ex: the 
    // second subscriber which is called after 3sec will get all the values i.e 1,2,3 which emitted
    // before it was subscribed. 
    const replaySubject = new ReplaySubject();
    replaySubject.subscribe(val => console.log("first "+val));
    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    setTimeout(() => replaySubject.subscribe(val => console.log("second "+val)),3000);
  }

}

