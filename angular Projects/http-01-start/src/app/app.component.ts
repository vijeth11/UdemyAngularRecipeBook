import { PostService } from './post.service';
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
  loadedPosts:Post[] = [];
  isloading:boolean=false;

  constructor(private http: HttpClient,private postService:PostService) {}

  ngOnInit() {
    this.isloading = true;
    this.postService.fetchPosts().subscribe(responseData => {
      this.isloading = false;
      this.loadedPosts = responseData;
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
    });
  }

  onClearPosts() {
    // Send Http request
  }

}