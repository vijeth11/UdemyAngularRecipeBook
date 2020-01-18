import { PostService } from './post.service';
import { Post } from './posts.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  
  loadedPosts:Post[] = [];
  isloading:boolean=false;
  error:string=null;
  private errorSubscription:Subscription;
  constructor(private http: HttpClient,private postService:PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isloading = true;
    this.postService.fetchPosts().subscribe(responseData => {
      this.isloading = false;
      this.loadedPosts = responseData;
    },error => {
      this.isloading = false;
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isloading = true;
    this.postService.fetchPosts().subscribe(responseData => {
      this.isloading = false;
      this.loadedPosts = responseData;
    }, error => {
      this.isloading = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deleteAllPost().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

  onHandleError(){
    this.error = null;
  }
  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}