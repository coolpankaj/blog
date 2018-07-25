import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public allBlogs;
  public currentBlog;

  public baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';
  // tslint:disable-next-line:max-line-length
  private authToken = 'ZWYxNjVkNjNjZjcxN2ZjNmQzMmM3NWQ4ODMxNjIzY2FhZjY1Yzc5YjYzMWVlYjI4YTIxNDg1NDJhOTBkMDMwOTgzOGZjMmUwODA4MTM4NGFjZjRlYWNjNzRhZDg5MzUzZGVhNGMxN2I1YTQzMmY1NDI4ZTk4NDFkZTNhYjUxY2M0ZA==';
  constructor(private _http: HttpClient) {
    console.log('Blog http service was called');
  }

  // Get All Blogs for Home Component
  public getAllBlogs(): any {
   const myResponse = this._http.get(this.baseUrl + `/all?authToken=${this.authToken}`);
    console.log(myResponse);
    return myResponse;
  }

  // Get Current Blog for Blog View Component
  public getCurrentBlog(currentBlogId) {
   const myResponse = this._http.get(this.baseUrl + `/view/${currentBlogId}?authToken=${this.authToken}`);
    console.log(myResponse);
    return myResponse;
  }

  // Post the blog data to Blog Create Component
  public createBlog(blogData): any{
   const myResponse = this._http.post(this.baseUrl + `/create?authToken=${this.authToken}`, blogData);
    return myResponse;
  }

  // get blog id and Delete a blog.
  public deleteBlog(blogId): any{
   const data = {};
   const myResponse = this._http.post(this.baseUrl + `/${blogId}/delete`, data);
    return myResponse;
  }

  // get the blog id and blog data for Blog Edit component.
  public editBlog(blogId, blogData): any {
    const myResponse = this._http.put(this.baseUrl + `/${blogId}/edit`, blogData);
    return myResponse;
  }
}
