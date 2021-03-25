import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { SubjectViewModel } from '../../../models/subject-view-model';
import { SubjectService } from '../../../service/subject.service';
import decode from 'jwt-decode';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.scss']
})
export class UpdateSubjectComponent extends BaseService implements OnInit {
  public subjectFormGroup: FormGroup;
  public subject : SubjectViewModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public _subjectService: SubjectService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateSubjectComponent>
  ) {
    super(_router, _currencyPipe, _datePipe);
   }

  ngOnInit() {
    this.initialize();
    console.log(this.data);
  }

  public initialize(): void {
    this.subjectFormGroup = new FormGroup({
      id:new FormControl(this.data.selectedSubject.id, [Validators.required]),
      name: new FormControl(this.data.selectedSubject.name, [Validators.required]),
      status: new FormControl(this.data.selectedSubject.status,[Validators.required]),
      createdUserId: new FormControl(this.data.selectedSubject.createdUserId,[Validators.required]),
    });
  }
  submitUpdateSubject(){
    if(this.subjectFormGroup.valid){
      const subject = this.subjectFormGroup.value;
      this.updateSubject(subject);
    }
  }
  public updateSubject(subject : SubjectViewModel){
    this._subjectService.updateSubject(subject).subscribe((reponse: any)=>{
      this._snackBar.open("Cập nhật thành công","Update",{
        duration: 1000
      });
      this.dialogRef.close(true);
    },
    (error)=>{
      this._snackBar.open("Cập nhật thất bại","Create",{
        duration: 1000
      });
    })
  }

}
