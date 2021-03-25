import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { UploadImageService } from 'src/app/core/services/upload-image.service';
import { environment } from 'src/environments/environment';
import { LectureViewModel } from '../../../models/lecture-view-model';
import { LectureService } from '../../../service/lecture.service';

@Component({
  selector: 'app-create-lecture',
  templateUrl: './create-lecture.component.html',
  styleUrls: ['./create-lecture.component.scss']
})
export class CreateLectureComponent implements OnInit {
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
    private dialogRef: MatDialogRef<CreateLectureComponent>,
    public _lectureService: LectureService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _upload: UploadImageService,
  ) { }

  ngOnInit() {
    this.initialize();
  }
  public initialize(): void {
    this.lectureFormGroup = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(10)]),
      sex: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      email: new FormControl("",[Validators.email]),
      facebook: new FormControl(""),
      level: new FormControl(""),
      note: new FormControl(""),
      createdUserId: new FormControl(""),
      image: new FormControl(""),
      firstName: new FormControl(""),
      lastName: new FormControl(""),
    });
  }

  public submitCreateLecture(){
    if(this.lectureFormGroup.valid){
      const token = localStorage.getItem('access_token');
      const tokenPayload = <any>decode(token);
      const userID = tokenPayload.UserID;
      let fullname = this.lectureFormGroup.value.fullName.split(' ');
      const firstName = fullname[0];
      const lastName = fullname.filter(x=>x != fullname[0]).join(' ');
      this.lectureFormGroup.value.firstName = firstName;
      this.lectureFormGroup.value.lastName = lastName;
      this.lectureFormGroup.value.image = this.imageFormGroup;
      this.lectureFormGroup.value.createdUserId = userID;
      this.lecture = this.lectureFormGroup.value;
      this.createLearner(this.lecture);
    }

  }
  public createLearner(lecture: LectureViewModel) {
    this._lectureService.createLecture(lecture).subscribe((respone:any)=>{
      this._snackBar.open("Thêm giáo viên thành công","Create",{
        duration:1000
      });
      this.dialogRef.close(true);
    },
    (error)=>{
      this._snackBar.open("Thêm giáo viên thất bại","Create",{
        duration:1000
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
