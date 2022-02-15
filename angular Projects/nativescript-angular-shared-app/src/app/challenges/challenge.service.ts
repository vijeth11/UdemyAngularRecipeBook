import { AuthService } from './../auth/auth.service';
import { DayStatus, Day } from './day.model';
import { BehaviorSubject, concatMap, of, take, tap, Subscription, switchMap } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core'
import { Challenge } from './challenge.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
        map((res:{
            title:string,
            description:string,
            month:number,
            year:number,
            _days:Day[]}) => {
            if(res){
                const loadedChallenge = new Challenge(
                    res.title,
                    res.description,
                    res.year,
                    res.month,
                    res._days);
                return loadedChallenge;
            }
            return  null;
        }),
        tap(res => {
                if(res){                    
                    this._currentChallenge.next(res);
                }
        }));
    }
    createNewChallenge(title: string, description:string){
        const newChallenge = new Challenge(title,description,new Date().getFullYear(), new Date().getMonth());
        this._currentChallenge.next(newChallenge);
        return this.saveToServer(newChallenge);
    }

    updateChallenge(title: string, description:string){
        return this._currentChallenge
        .pipe(
        take(1),
        switchMap(challenge => {
            const updatedChallenge = new Challenge(title,description,challenge.year,challenge.month,challenge.days);
            this._currentChallenge.next(updatedChallenge);
            return this.saveToServer(updatedChallenge);
        }));
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
            this.saveToServer(challenge).subscribe(res => console.log(res));;
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
        return this.authService.User.pipe(
            take(1),
            concatMap(currentUser => {
            if(!currentUser || !currentUser.isAuth){
                return of(null);
            }
            return this.http
            .put(`https://monthly-challenge-d6aee-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`,challenge)
        }))
        
    }

    ngOnDestroy(): void {
        if(this.userSub){
            this.userSub.unsubscribe();
        }
    }
}