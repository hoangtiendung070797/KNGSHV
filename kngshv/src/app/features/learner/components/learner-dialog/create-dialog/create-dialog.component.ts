import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { LearnerViewModel } from '../../../models/learner-view-model';
import { LearnerService } from '../../../services/learner.service';
import decode from 'jwt-decode';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UploadImageService } from 'src/app/core/services/upload-image.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent extends BaseService implements OnInit {
  public learnerFormGroup: FormGroup;
  public learner: LearnerViewModel;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  public imageDomain = environment.localDomain;
  public imageUrl: string = "";
  public imageFormGroup :string;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    public _learnerService: LearnerService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _upload: UploadImageService,
  ) {
    super(_router, _currencyPipe, _datePipe);
  }

  ngOnInit() {
    this.initialize();
  }
  public initialize(): void {
    this.learnerFormGroup = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      phone: new FormControl("", [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(10)]),
      sex: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email]),
      facebook: new FormControl(""),
      parentFullName: new FormControl("", [Validators.required]),
      parentPhone: new FormControl("", [Validators.required]),
      note: new FormControl(""),
      createdUserId: new FormControl(""),
      image: new FormControl(""),
    });
  }
  /**
   * Thêm học viên
   */
  public submitCreateLearner() {

    if (this.learnerFormGroup.valid) {
      const token = localStorage.getItem('access_token');
      const tokenPayload = <any>decode(token);
      const userID = tokenPayload.UserID;
      let fullName = this.learnerFormGroup.value.fullName.split(' ');
      const firstName = fullName[0];
      const lastName = fullName.filter(x => x != firstName).join(' ');
      this.learnerFormGroup.value.firstName = firstName;
      this.learnerFormGroup.value.lastName = lastName;
      this.learnerFormGroup.value.createdUserId = userID;
      this.learnerFormGroup.value.image = this.imageFormGroup;
      this.learner = this.learnerFormGroup.value;
      console.log(this.learnerFormGroup.value);

      this.createLearner(this.learner);
    }

  }

  public createLearner(learner: LearnerViewModel) {
    this._learnerService.createLearner(learner).subscribe((respone: any) => {
      this._snackBar.open("Thêm học viên thành công", "Create", {
        duration: 1000
      });
      this.dialogRef.close(true);
    },
      (error) => {
        this._snackBar.open("Thêm học viên thất bại", "Create", {
          duration: 1000
        })
      })
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._upload.uploadImage(formData).subscribe((response: any) => {
      console.log(response);
      this.imageUrl = `${this.imageDomain}\\${response.dbPath}`;
      this.imageFormGroup = this.imageUrl;
    }, error => {

    }
    );
  }
}
