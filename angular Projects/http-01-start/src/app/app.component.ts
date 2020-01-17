import { Post } from './posts.module';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{[id:string]:Post}>(
        'https://angular-comlete-guide-udemy.firebaseio.com/post.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http
      .get<{[id:string]:Post}>('https://angular-comlete-guide-udemy.firebaseio.com/post.json')
      .pipe(map((responsedata:{[postId:string]:Post}) => {
        var postsArray=[]
        for(var key in responsedata){
          postsArray.push({...responsedata[key],id:key});
        }
        return postsArray
      }))
      .subscribe(responsedata=>{
        console.log(responsedata);
      })
  }
}
