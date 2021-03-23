import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComfirmComponent } from 'src/app/shared/components/comfirm/comfirm.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { CreateDialogComponent } from '../../components/learner-dialog/create-dialog/create-dialog.component';
import { UpdateDialogComponent } from '../../components/learner-dialog/update-dialog/update-dialog.component';
import { LearnerViewModel } from '../../models/learner-view-model';
import { LearnerService } from '../../services/learner.service';


@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.scss']
})
export class LearnerComponent extends BaseService implements OnInit {
  public displayedColumns: string[] = [
    'index',
    'fullName',
    'sex',
    'birthday',
    'phone',
    'address',
    'controls'
  ];
  public dataSource = new MatTableDataSource<LearnerViewModel>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public orginalAccounts: LearnerViewModel[] = [];
  public learners: LearnerViewModel[] = [];
  public selectedLearners;
  constructor(
    public _learnerService: LearnerService,
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
    this.getLearners();
  }
  public getLearners() {
    this._learnerService.getLearner().subscribe((reponse: any) => {
      this.learners = reponse;
      console.log(this.learners);
      this.setLearnerTableSource(this.learners);
    },
      (error) => {
        this.learners = [];
      }
    );

  }
  public setLearnerTableSource(learners: LearnerViewModel[]): void {
    this.dataSource = new MatTableDataSource<LearnerViewModel>(learners);
    this.dataSource.paginator = this.paginator;
  }

  public openCreateLearner() {
    this.dialog.open(CreateDialogComponent,{
      data:{

      },
      width: '70vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isCreated:boolean)=>{
      if(isCreated){
        this.getLearners();
      }
    })

  }

  public openUpdateLearner(learner: LearnerViewModel): void {
    this.dialog.open(UpdateDialogComponent, {
      data: {
        selectedLearner: learner
      },
      width: '70vw',
      maxHeight: '90vh'
    }).afterClosed().subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.getLearners();
      }
    });
  }


  public openDeleteLeaner(id: string) {
    this.dialog.open(ComfirmComponent, {
      data: {
        message: 'Xóa thông tin học viên',
        matTooltip: 'Xác nhận xóa thông tin học viêns',
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      }
    }).afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.deleleLearner(id);
        this._snackBar.open("Xoá thành công", "Delete", { duration: 1000 })
      }
    });
  }
  public deleleLearner(id: string){
    this._learnerService.deleteLearner(id).subscribe((reponse:any)=>{
      if(1===reponse.statusCode){
        this.getLearners();
      }
    },
    (error)=>{

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
