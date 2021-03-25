import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { SubjectViewModel } from '../../../models/subject-view-model';
import { SubjectService } from '../../../service/subject.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent extends BaseService implements OnInit {
  public subjectFormGroup: FormGroup;
  public subject : SubjectViewModel;
  constructor(
    public _subjectService: SubjectService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateSubjectComponent>
  ) {
    super(_router, _currencyPipe, _datePipe);
   }

  ngOnInit() {
    this.initialize();
  }
  public initialize(): void {
    this.subjectFormGroup = new FormGroup({
      name: new FormControl("", [Validators.required]),
      status: new FormControl(1,[Validators.required]),
      createdUserId: new FormControl(""),
    });
  }
  submitCreatSubject(){
    if(this.subjectFormGroup.valid){
      const token = localStorage.getItem('access_token');
      const tokenPayload = <any>decode(token);
      const userID = tokenPayload.UserID;
      this.subjectFormGroup.value.createdUserId = userID;
      const subject = this.subjectFormGroup.value;
      console.log(subject);
      this.createSubject(subject);
    }
  }
  public createSubject(subject : SubjectViewModel){
    this._subjectService.createSubject(subject).subscribe((reponse: any)=>{
      this._snackBar.open("Thêm thành công","Create",{
        duration: 1000
      });
      this.dialogRef.close(true);
    },
    (error)=>{
      this._snackBar.open("Thêm thất bại","Create",{
        duration: 1000
      });
    })
  }

}
