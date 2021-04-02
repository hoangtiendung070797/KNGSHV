import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateAccountComponent } from 'src/app/features/account/components/account-dialogs/create-account/create-account.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogViewModel } from '../../../models/blog-view-model';
import { BlogService } from '../../../services/blog.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent extends BaseService implements OnInit {
  public ckeditorContent;
  public blogFormGroup: FormGroup;
  public blogTypes;

  constructor(
    public _blogService: BlogService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateAccountComponent>
  ) {
    super(_router, _currencyPipe, _datePipe);
  }

  ngOnInit() {
    this.initialize();
  }
  public initialize(): void {
    this.getBlogTypes();
    this.blogFormGroup = new FormGroup({
      title: new FormControl("", [Validators.required]),
      content: new FormControl(""),
      createdUserId: new FormControl(""),
      blogTypeId: new FormControl("", [Validators.required]),
    });
  }
  public getBlogTypes() {
    this._blogService.getBolgTypes().subscribe((respone: any) => {
      this.blogTypes = respone;
      console.log(this.blogTypes)
    }, (error) => {
      this.blogTypes = [];
    })
  }
  public submitCreatBlog() {
    console.log("Nhận");
    //console.log(this.blogFormGroup.value);

    if (this.blogFormGroup.valid) {
      const token = localStorage.getItem('access_token');
      const tokenPayload = <any>decode(token);
      const userID = tokenPayload.UserID;
      let createBlog = this.blogFormGroup.value;
      createBlog.content = this.ckeditorContent;
      createBlog.createdUserId = userID;
      this.createBlog(createBlog);
    }
  }

  public createBlog(blog: BlogViewModel) {
    this._blogService.createBlog(blog).subscribe((respone: any) => {
      this._snackBar.open("Tạo bài viết thành công", "Create", { duration: 1000 });
      this.dialogRef.close(true);
    }, (error) => {
      this._snackBar.open("Tạo bài viết thất bại", "Create", { duration: 1000 });
    });

  }

}
