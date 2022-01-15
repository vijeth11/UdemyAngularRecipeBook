import { DayStatus } from './day.model';
import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core'
import { Challenge } from './challenge.model';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    get currentChallenge(){
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description:string){
        const newChallenge = new Challenge(title,description,new Date().getFullYear(), new Date().getMonth());
        // Save it for server
        this._currentChallenge.next(newChallenge);
    }

    updateChallenge(title: string, description:string){
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            const updatedChallenge = new Challenge(title,description,challenge.year,challenge.month,challenge.days);
            // Save it for server
            this._currentChallenge.next(updatedChallenge);
        });
    }
    updateDayStatus(dayInmonth:number, status: DayStatus ){
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if(!challenge || challenge.days.length < dayInmonth){
                return;
            }
            const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInmonth);
            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            console.log(challenge.days[dayIndex]);
            // Save Server
        });
    }

    getActionName(status:DayStatus){
        if(status === DayStatus.Completed){
          return 'complete';
        }
        if(status === DayStatus.Failed){
          return 'fail';
        }
      }
}