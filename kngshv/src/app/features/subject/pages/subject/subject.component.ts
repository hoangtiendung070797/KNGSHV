import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComfirmComponent } from 'src/app/shared/components/comfirm/comfirm.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { CreateSubjectComponent } from '../../components/subject-dialog/create-subject/create-subject.component';
import { UpdateSubjectComponent } from '../../components/subject-dialog/update-subject/update-subject.component';
import { SubjectViewModel } from '../../models/subject-view-model';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent extends BaseService implements OnInit {
  public displayedColumns: string[] = [
    'index',
    'name',
    'status',
    'controls'
  ];
  public dataSource = new MatTableDataSource<SubjectViewModel>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public subjects: SubjectViewModel[] = [];
  public selectedSubject;
  constructor(
    public _subjectService: SubjectService,
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
    this.getSubjects();
  }

  public getSubjects() {
    this._subjectService.getSubject().subscribe((respone:any)=>{
        console.log(respone);
        this.subjects = respone;
        this.setLectureTableSource(this.subjects);
    },
    (error) =>{
    })
  }

  public setLectureTableSource(lecture: SubjectViewModel[]): void {
    this.dataSource = new MatTableDataSource<SubjectViewModel>(lecture);
    this.dataSource.paginator = this.paginator;
  }

  public openCreateSubject() {
    this.dialog.open(CreateSubjectComponent, {
      data: {
      },
      width: '30vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isCreated: boolean) => {
      if (isCreated) {
        this.getSubjects();
      }
    });
  }

  public openUpdateLecture(subject: SubjectViewModel): void {
    this.dialog.open(UpdateSubjectComponent, {
      data: {
        selectedSubject : subject
      },
      width: '30vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isCreated: boolean) => {
      if (isCreated) {
        this.getSubjects();
      }
    });

  }

  public openDeleteSubject(id: string) {
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
        this.deleleSubject(id);

      }
    });
  }
  public deleleSubject(id: string){
    this._subjectService.deleteSubject(id).subscribe((respone:any)=>{
      this.getSubjects();
      this._snackBar.open("Xoá thành công","Delete",{duration:1000});
    },(error)=>{
      this._snackBar.open("Xoá thành công","Delete",{duration:1000});
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
