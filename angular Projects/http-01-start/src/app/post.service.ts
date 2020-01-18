import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './posts.module';
import {map} from 'rxjs/operators'
@Injectable({
    providedIn:'root'
})
export class PostService {
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
      });
    }
    fetchPosts(){
        return this.http
        .get<{[id:string]:Post}>('https://angular-comlete-guide-udemy.firebaseio.com/post.json')
        .pipe(map((responsedata:{[postId:string]:Post}) => {
          var postsArray=[]
          for(var key in responsedata){
            postsArray.push({...responsedata[key],id:key});
          }
          return postsArray
        }));
    }

    deleteAllPost(idList:string[]){
      
    }
}