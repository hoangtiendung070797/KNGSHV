import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogViewModel } from '../../../models/blog-view-model';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent extends BaseService  implements OnInit {
  public ckeditorContent;
  public blogFormGroup: FormGroup;
  public blogTypes;
  public selectedType;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    public _blogService: BlogService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateBlogComponent>
  ) {
    super(_router, _currencyPipe, _datePipe);
   }

  ngOnInit() {
    this.initialize();
  }
  public initialize(): void {
    this.getBlogTypes();
    this.ckeditorContent = this.data.selectedBlog.content;
    this.selectedType =  this.data.selectedBlog.blogTypeId;
    this.blogFormGroup = new FormGroup({
      id: new FormControl(this.data.selectedBlog.id, [Validators.required]),
      title: new FormControl(this.data.selectedBlog.title, [Validators.required]),
      content: new FormControl(this.data.selectedBlog.content,[Validators.required]),
      createdUserId: new FormControl(this.data.selectedBlog.createdUserId),
      blogTypeId: new FormControl(this.data.selectedBlog.blogType, [Validators.required]),
    });
  }
  public getBlogTypes() {
    this._blogService.getBolgTypes().subscribe((respone: any) => {
      this.blogTypes = respone;
    }, (error) => {
      this.blogTypes = [];
    })
  }
  public submitUpdateBlog() {
    if (this.blogFormGroup.valid) {
      let updateBlog = this.blogFormGroup.value;
      updateBlog.content = this.ckeditorContent;
      this.updateBlog(updateBlog);
    }
  }

  public updateBlog(blog: BlogViewModel) {
    this._blogService.updateBlog(blog).subscribe((respone: any) => {
      this._snackBar.open("Cập nhật bài viết thành công", "Update", { duration: 1000 });
      this.dialogRef.close(true);
    }, (error) => {
      this._snackBar.open("Cập nhật bài viết thất bại", "Update", { duration: 1000 });
    });

  }

}
