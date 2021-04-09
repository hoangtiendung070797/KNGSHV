import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountViewModel } from 'src/app/features/account/models/account-view-model';
import { LectureViewModel } from 'src/app/features/lecture/models/lecture-view-model';
import { LectureService } from 'src/app/features/lecture/service/lecture.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LectureScheduleService } from '../../service/lecture-schedule.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent extends BaseService implements OnInit {

  public scheduleFormGroup: FormGroup;
  public lectures;
  constructor(
    public _scheduleService: LectureScheduleService,
    public _lecturService: LectureService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateScheduleComponent>
  ) {
    super(_router, _currencyPipe, _datePipe);
  }

  ngOnInit() {
    this.initialize();
    this.getLecture();
  }
  public getLecture(){
    this._lecturService.getLectures().subscribe((respone:any)=>{
        this.lectures = respone;
        console.log(this.lectures)
    },(error)=>{
      this.lectures =[];

    })
  }

  public initialize(): void {
    this.scheduleFormGroup = new FormGroup({
      note: new FormControl("", [Validators.required]),
      fromDate: new FormControl("",[Validators.required]),
      toDate: new FormControl("",[Validators.required]),
      fromTime: new FormControl("",[Validators.required]),
      toTime: new FormControl("",[Validators.required]),
      lectureId: new FormControl("",[Validators.required]),
      subjectId: new FormControl("",[Validators.required]),
    });
  }
  submitCreatAccount(){
    console.log(this.scheduleFormGroup.value);
    if(this.scheduleFormGroup.valid){
      const createAccount = this.scheduleFormGroup.value;
      this.createAccount(createAccount);
    }
  }

  public createAccount(account : AccountViewModel){
    // this._accountService.createAccount(account).subscribe((reponse: any)=>{
    //   this._snackBar.open("Tạo tài khoản thành công","Create",{
    //     duration: 1000
    //   });
    //   this.dialogRef.close(true);
    // },
    // (error)=>{
    //   this._snackBar.open("Tạo tài khoản thất bại","Create",{
    //     duration: 1000
    //   });
    // })
  }

}
