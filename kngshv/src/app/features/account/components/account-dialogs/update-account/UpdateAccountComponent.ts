import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { AccountViewModel } from '../../../models/account-view-model';
import { AccountService } from '../../../services/account.service';


@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent extends BaseService implements OnInit {

  public accountFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UpdateAccountComponent>,
    public _accountService: AccountService,
    public _router: Router,
    public _currencyPipe: CurrencyPipe,
    public _datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    super(_router, _currencyPipe, _datePipe);
  }

  ngOnInit() {
    this.initialize();
    console.log(this.data);
  }

  public initialize(): void {
    this.accountFormGroup = new FormGroup({
      id: new FormControl(this.data.selectedAccount.id, [Validators.required]),
      fullName: new FormControl(this.data.selectedAccount.fullName, [Validators.required]),
      birthDay: new FormControl(this.data.selectedAccount.birthDay),
      phoneNumber: new FormControl(this.data.selectedAccount.phoneNumber,[Validators.pattern('[- +()0-9]+'),Validators.maxLength(10)]),
      address: new FormControl(this.data.selectedAccount.address, [Validators.required])

    });
  }

  public submitUpdateAccount(): void {
    if (this.accountFormGroup.valid) {
      const updatedAccount = this.accountFormGroup.value;
      this.updateAccount(updatedAccount);
    }
  }

  public updateAccount(account: AccountViewModel) {
    this._accountService.updateAccount(account).subscribe((reponse: any) => {

      this._snackBar.open("Cập nhật thành công", "Update", {
        duration: 1000,
      });
      this.dialogRef.close(true);
    }, (error) => {
      this._snackBar.open("Cập nhật thất bại", "Update", {
        duration: 1000,
      });
    })
  }

}
