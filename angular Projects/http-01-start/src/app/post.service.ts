import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './posts.module';
import {map, catchError} from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class PostService {
  error:Subject<string> = new Subject<string>();
    constructor(private http:HttpClient){}
    
    createAndStorePost(title:string,content:string){
        const postData:Post={title:title,content:content};
        this.http
      .post<{name:string}>(
        'https://angular-comlete-guide-udemy.firebaseio.com/post.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      },error => {
        this.error.next(error.message);
      });
    }
    fetchPosts(){
      let searchParams:HttpParams = new HttpParams();
       searchParams = searchParams.append('printt','pretty');
       searchParams = searchParams.append('Custom','key');
        return this.http
        .get<{[id:string]:Post}>('https://angular-comlete-guide-udemy.firebaseio.com/post.json',
        {
          headers:new HttpHeaders({'Custom-Header':'hello'}),
          //params: new HttpParams().set('print','pretty')
          params:searchParams
        })
        .pipe(
          map((responsedata:{[postId:string]:Post}) => {
          var postsArray=[]
          for(var key in responsedata){
            postsArray.push({...responsedata[key],id:key});
          }
          return postsArray
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        }));
    }

    deleteAllPost(){
      return this.http.delete('https://angular-comlete-guide-udemy.firebaseio.com/post.json')
    }
}