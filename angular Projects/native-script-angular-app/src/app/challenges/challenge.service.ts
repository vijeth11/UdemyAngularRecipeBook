import { AuthService } from './../auth/auth.service';
import { DayStatus, Day } from './day.model';
import { BehaviorSubject, concatMap, of, take, tap, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core'
import { Challenge } from './challenge.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService implements OnDestroy{
    
    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private userSub:Subscription;

    get currentChallenge(){
        return this._currentChallenge.asObservable();
    }

    constructor(private http:HttpClient, private authService:AuthService){
        this.userSub = this.authService.User.subscribe(user => {
            if(!user){
                this.cleanUp();
            }
        });
    }

    fetchCurrentChallenge(){
        return this.authService.User.pipe(
        take(1), // fro auto unsubscribe
        concatMap(currentUser => {
            if(!currentUser || !currentUser.isAuth){
                return of(null);
            }
            return this.http.get<{
                title:string,
                description:string,
                month:number,
                year:number,
                _days:Day[]}>(`https://monthly-challenge-d6aee-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`)
        }),
        tap(res => {
                if(res){
                    const loadedChallenge = new Challenge(res.title,res.description,res.year,res.month,res._days);
                    this._currentChallenge.next(loadedChallenge);
                }
        }));
    }
    createNewChallenge(title: string, description:string){
        const newChallenge = new Challenge(title,description,new Date().getFullYear(), new Date().getMonth());
        this.saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    updateChallenge(title: string, description:string){
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            const updatedChallenge = new Challenge(title,description,challenge.year,challenge.month,challenge.days);
            this.saveToServer(updatedChallenge);
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
            this.saveToServer(challenge);
        });
    }

    cleanUp(){
        this._currentChallenge.next(null);
    }

    getActionName(status:DayStatus){
        if(status === DayStatus.Completed){
          return 'complete';
        }
        if(status === DayStatus.Failed){
          return 'fail';
        }
    }

    private saveToServer(challenge:Challenge){
        this.authService.User.pipe(
            take(1),
            concatMap(currentUser => {
            if(!currentUser || !currentUser.isAuth){
                return of(null);
            }
            return this.http
            .put(`https://monthly-challenge-d6aee-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`,challenge)
        }))
        .subscribe(res => console.log(res));
    }

    ngOnDestroy(): void {
        if(this.userSub){
            this.userSub.unsubscribe();
        }
    }
}