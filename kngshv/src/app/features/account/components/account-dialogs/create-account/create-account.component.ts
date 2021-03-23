import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { AccountViewModel } from '../../../models/account-view-model';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends BaseService implements OnInit {
  public accountFormGroup: FormGroup;

  constructor(
    public _accountService: AccountService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateAccountComponent>
  ) {
    super(_router, _currencyPipe, _datePipe);
  }

  ngOnInit() {
    this.initialize();

  }

  public initialize(): void {
    this.accountFormGroup = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      birthDay: new FormControl(""),
      address: new FormControl(""),
      userName: new FormControl("",[Validators.required]),
      passwordHash: new FormControl("",[Validators.required])

    });
  }
  submitCreatAccount(){
    console.log(this.accountFormGroup.value);
    if(this.accountFormGroup.valid){
      const createAccount = this.accountFormGroup.value;
      this.createAccount(createAccount);
    }
  }

  public createAccount(account : AccountViewModel){
    this._accountService.createAccount(account).subscribe((reponse: any)=>{
      this._snackBar.open("Tạo tài khoản thành công","Create",{
        duration: 1000
      });
      this.dialogRef.close(true);
    },
    (error)=>{
      this._snackBar.open("Tạo tài khoản thất bại","Create",{
        duration: 1000
      });
    })
  }
}
