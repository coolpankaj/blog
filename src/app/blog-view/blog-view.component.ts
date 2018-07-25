import { Component, OnInit, OnDestroy } from '@angular/core';

// Importing the Activated Route from router.
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';

import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers: [Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {

  public currentBlog;


  // tslint:disable-next-line:max-line-length
  constructor(private _route: ActivatedRoute, private router: Router, public blogHttpService: BlogHttpService, private toastr: ToastrService, private location: Location, private spinner: NgxSpinnerService) {
    console.log('Blog view component constructor called');



  }


  ngOnInit() {
    this.spinner.show();
    console.log('Blog View Component On Init called');
    const currentBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(currentBlogId);

    this.blogHttpService.getCurrentBlog(currentBlogId).subscribe(
      data => {
        this.currentBlog = data['data'];
        this.spinner.hide();
      },
      error => {
        console.log('Some error occured');
        console.log(error.errorMessage);
      }
    );
  }

  public deleteThisBlog(): any {
    console.log(this.currentBlog.blogId);
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(

      data => {
        console.log(data);
        this.toastr.success('Blog Deleted Successfully', 'Success');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error => {
        console.log('Some Error Occured');
        console.log(error.errorMessage);
        this.toastr.error('Some Error Occured', 'Error');
      }
    );
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }

  ngOnDestroy() {
    console.log('Blog View Component Destroyed');
  }

}
