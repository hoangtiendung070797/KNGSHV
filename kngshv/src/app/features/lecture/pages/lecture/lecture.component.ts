import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComfirmComponent } from 'src/app/shared/components/comfirm/comfirm.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { CreateLectureComponent } from '../../components/lecture-dialog/create-lecture/create-lecture.component';
import { UpdateLectureComponent } from '../../components/lecture-dialog/update-lecture/update-lecture.component';
import { LectureViewModel } from '../../models/lecture-view-model';
import { LectureService } from '../../service/lecture.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent extends BaseService implements OnInit {
  public displayedColumns: string[] = [
    'index',
    'fullName',
    'sex',
    'birthday',
    'phone',
    'address',
    'controls'
  ];
  public dataSource = new MatTableDataSource<LectureViewModel>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public lectures: LectureViewModel[] = [];
  public selectedLecture;

  constructor(
    public _lectureService: LectureService,
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
    this.getLectures();
  }

  public getLectures() {
    this._lectureService.getLectures().subscribe((respone:any)=>{
        console.log(respone);
        this.lectures = respone;
        this.setLectureTableSource(this.lectures);
    },
    (error) =>{
    }
    )
  }

  public setLectureTableSource(lecture: LectureViewModel[]): void {
    this.dataSource = new MatTableDataSource<LectureViewModel>(lecture);
    this.dataSource.paginator = this.paginator;
  }

  public openCreateLecture() {
    this.dialog.open(CreateLectureComponent,{
      data:{
      },
      width: '70vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isCreate: boolean) => {
      if(isCreate){
        this.getLectures();

      }
    });


  }

  public openUpdateLecture(lecture: LectureViewModel): void {
    this.dialog.open(UpdateLectureComponent, {
      data: {
        selectedLecture: lecture
      },
      width: '70vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isUpdated: boolean) => {
      if(isUpdated){
        this.getLectures();

      }
    });
  }

  public openDeleteLecture(id: string) {
    this.dialog.open(ComfirmComponent, {
      data: {
        message: 'Xóa thông tin giáo viên',
        matTooltip: 'Xác nhận xóa thông tin giáo viên',
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      }
    }).afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.deleleLecture(id);

      }
    });
  }

  public deleleLecture(id: string){
    this._lectureService.deleteLecture(id).subscribe((respone:any)=>{
      this.getLectures();
      this._snackBar.open("Xoá thành công", "Delete", { duration: 1000 })
    },(error)=>{
      this._snackBar.open("Xoá thành thất bại", "Delete", { duration: 1000 })

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
