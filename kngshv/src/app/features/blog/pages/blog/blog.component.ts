import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ComfirmComponent } from 'src/app/shared/components/comfirm/comfirm.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { CreateBlogComponent } from '../../components/blog-dialog/create-blog/create-blog.component';
import { UpdateBlogComponent } from '../../components/blog-dialog/update-blog/update-blog.component';
import { BlogViewModel } from '../../models/blog-view-model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends BaseService implements OnInit {
  public editor = ClassicEditor;

  ckeditorContent;
  public displayedColumns: string[] = ['index', 'title', 'name', 'dateCreated', 'controls'];
  public dataSource = new MatTableDataSource<BlogViewModel>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public blogs: BlogViewModel[] = [];
  public selectedBlog;


  constructor(
    public _blogService: BlogService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    super(_router, _currencyPipe, _datePipe);
  }

  ngOnInit() {
    this.initialize();
  }
  public initialize(): void {
    this.getBlogs();
    console.log(this.dataSource);
    //console.log(this.blogs);
  }

  public getBlogs(): void {
    this._blogService.getBlogs().subscribe((response: any) => {
      console.log(response);
      this.blogs = response;
      this.setAccountSource(this.blogs);
    }, (error) => {
      this.blogs = [];
    });
  }
  public setAccountSource(blogs: BlogViewModel[]): void {
    this.dataSource = new MatTableDataSource<BlogViewModel>(blogs);
    this.dataSource.paginator = this.paginator;

  }

  public openCreateBlog(): void {
    this.dialog.open(CreateBlogComponent, {
      data: {
      },
      width: '70vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isCreated: boolean) => {
      if (isCreated) {
        this.getBlogs();
      }
    });
  }

  public openUpdateBlog(blog: BlogViewModel): void {
    this.dialog.open(UpdateBlogComponent, {
      data: {
        selectedBlog: blog
      },
      width: '70vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.getBlogs();
      }
    });

  }

  public openDeleteBlog(id: string): void {
    this.dialog.open(ComfirmComponent, {
      data: {
        message: 'Xóa bài viết',
        matTooltip: 'Xác nhận xóa bài viết',
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      }
    }).afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.deleteBlog(id);
      }
    });


  }

  public deleteBlog(id: string) {
    this._blogService.deleteBlog(id).subscribe((respone:any)=>{
      this.getBlogs();
        this._snackBar.open("Xoá bài viết thành công","Delete",{duration:10000});

    },(error)=>{
      this._snackBar.open("Xoá bài viết thất bại","Delete",{duration:10000});
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
