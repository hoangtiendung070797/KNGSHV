import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/core/services/upload-image.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { LectureViewModel } from '../../../models/lecture-view-model';
import { LectureService } from '../../../service/lecture.service';

@Component({
  selector: 'app-update-lecture',
  templateUrl: './update-lecture.component.html',
  styleUrls: ['./update-lecture.component.scss']
})
export class UpdateLectureComponent extends BaseService implements OnInit {
  public lectureFormGroup: FormGroup;
  public lecture: LectureViewModel;

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  public imageDomain = environment.localDomain;
  public imageUrl: string = "";
  public imageFormGroup :string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UpdateLectureComponent>,
    public _lectureService: LectureService,
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
    this.imageFormGroup = this.data.selectedLecture.image;
    this.lectureFormGroup = new FormGroup({
      id: new FormControl(this.data.selectedLecture.id, [Validators.required]),
      fullName: new FormControl(this.data.selectedLecture.firstName + " " + this.data.selectedLecture.lastName, [Validators.required]),
      phone: new FormControl(this.data.selectedLecture.phone, [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(10)]),
      sex: new FormControl(this.data.selectedLecture.sex, [Validators.required]),
      birthday: new FormControl(this.data.selectedLecture.birthday, [Validators.required]),
      address: new FormControl(this.data.selectedLecture.address, [Validators.required]),
      email: new FormControl(this.data.selectedLecture.email),
      facebook: new FormControl(this.data.selectedLecture.facebook),
      level: new FormControl(this.data.selectedLecture.level),
      note: new FormControl(this.data.selectedLecture.note),
      createdUserId: new FormControl(this.data.selectedLecture.createdUserId,[Validators.required]),
      image: new FormControl(this.data.selectedLecture.image),
      accountId: new FormControl(this.data.selectedLecture.accountId),
    });


  }
  public submitUpdateLecture(){
    if (this.lectureFormGroup.valid) {
      let fullNames = this.lectureFormGroup.value.fullName.split(' ');
      const firstName = fullNames[0];
      const lastName = fullNames.filter(x => x != firstName).join(' ');
      this.lectureFormGroup.value.firstName = firstName;
      this.lectureFormGroup.value.lastName = lastName;
      this.lectureFormGroup.value.image = this.imageFormGroup;
      this.lecture   = this.lectureFormGroup.value;
      this.updateLearner(this.lecture);
    }

  }
  public updateLearner(lecture: LectureViewModel) {
    this._lectureService.updateLecture(lecture).subscribe((respone:any)=>{
      this._snackBar.open("Cập nhật thành công","Update",{
        duration: 1000,

      })
      this.dialogRef.close(true);
    },
    (error)=>{
      this._snackBar.open("Cập nhật thất bại","Update",{
        duration: 1000,
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
