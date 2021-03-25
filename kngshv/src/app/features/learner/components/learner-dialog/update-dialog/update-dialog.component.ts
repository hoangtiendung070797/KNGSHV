import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/core/services/upload-image.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { LearnerViewModel } from '../../../models/learner-view-model';
import { LearnerService } from '../../../services/learner.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent extends BaseService implements OnInit {

  public learnerFormGroup: FormGroup;
  public learner: LearnerViewModel;

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  public imageDomain = environment.localDomain;
  public imageUrl: string = "";
  public imageFormGroup :string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
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
    console.log(this.data);
    this.initialize();
  }

  public initialize(): void {
    this.imageFormGroup = this.data.selectedLearner.image;
    this.learnerFormGroup = new FormGroup({
      id: new FormControl(this.data.selectedLearner.id, [Validators.required]),
      fullName: new FormControl(this.data.selectedLearner.firstName + " " + this.data.selectedLearner.lastName, [Validators.required]),
      phone: new FormControl(this.data.selectedLearner.phone, [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(10)]),
      sex: new FormControl(this.data.selectedLearner.sex, [Validators.required]),
      birthday: new FormControl(this.data.selectedLearner.birthday, [Validators.required]),
      address: new FormControl(this.data.selectedLearner.address, [Validators.required]),
      email: new FormControl(this.data.selectedLearner.email),
      facebook: new FormControl(this.data.selectedLearner.facebook),
      parentFullName: new FormControl(this.data.selectedLearner.parentFullName, [Validators.required]),
      parentPhone: new FormControl(this.data.selectedLearner.parentPhone, [Validators.required]),
      note: new FormControl(this.data.selectedLearner.note),
      createdUserId: new FormControl(this.data.selectedLearner.createdUserId,[Validators.required]),
      image: new FormControl(this.data.selectedLearner.image),
    });
  }

  public submitUpdateLearner() {
    if (this.learnerFormGroup.valid) {
      let fullNames = this.learnerFormGroup.value.fullName.split(' ');
      const firstName = fullNames[0];
      const lastName = fullNames.filter(x => x != firstName).join(' ');
      this.learnerFormGroup.value.firstName = firstName;
      this.learnerFormGroup.value.lastName = lastName;
      this.learnerFormGroup.value.image = this.imageFormGroup;
      this.learner = this.learnerFormGroup.value;
      this.updateLearner(this.learner);
    }
  }
  public updateLearner(leaner: LearnerViewModel) {
    this._learnerService.updateLearner(leaner).subscribe((respone: any) => {
      this._snackBar.open("Cập nhật thành công", "Update", {
        duration: 1000
      });
      this.dialogRef.close(true);
    },
      (error) => {
        this._snackBar.open("Cập nhật thất bại", "Update", {
          duration: 1000
        });
      });
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
