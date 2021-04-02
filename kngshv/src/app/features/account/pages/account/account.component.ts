import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ComfirmComponent } from 'src/app/shared/components/comfirm/comfirm.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { CreateAccountComponent } from '../../components/account-dialogs/create-account/create-account.component';
import { UpdateAccountComponent } from '../../components/account-dialogs/update-account/UpdateAccountComponent';
import { AccountViewModel } from '../../models/account-view-model';
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseService implements OnInit {
  public displayedColumns: string[] = ['index', 'fullName', 'userName', 'birthDay', 'controls'];
  public dataSource = new MatTableDataSource<AccountViewModel>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public orginalAccounts: AccountViewModel[] = [];
  public accounts: AccountViewModel[] = [];
  public selectedAccount;

  constructor(
    public _accountService: AccountService,
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
    this.getAccounts();
  }

  public getAccounts(): void {
    this._accountService.getAccounts().subscribe((response: AccountViewModel[]) => {
      this.accounts = response;
      this.orginalAccounts = this.Clone(this.accounts);
      this.setAccountSource(this.accounts);
    }, (error) => {
      this.accounts = [];
    });
  }


  public creatUpdateAccount(): void {
    this.dialog.open(CreateAccountComponent, {
      data: {
      },
      width: '30vw',
      maxHeight: '80vh'
    }).afterClosed().subscribe((isCreated: boolean) => {
      if (isCreated) {
        this.getAccounts();
      }
    });

  }


  public openUpdateAccount(account: AccountViewModel): void {
    this.dialog.open(UpdateAccountComponent, {
      data: {
        selectedAccount: account
      },
      width: '30vw',
      maxHeight: '80vh'
    }).afterClosed().subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.getAccounts();
      }
    });

  }

  public openDeleteAccount(id: string): void {

    this.dialog.open(ComfirmComponent, {
      data: {
        message: 'Xóa thông tin tài khoản',
        matTooltip: 'Xác nhận xóa thông tin tài khoản',
        matTooltipPosition: 'below',
        colorOK: 'accent',
        colorCancel: 'white'
      }
    }).afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.deleteAccount(id);
        this._snackBar.open("Xoá thành công", "Delete", { duration: 1000 })
      }
    });


  }

  public deleteAccount(id: string) {
    this._accountService.deleteAccount(id).subscribe((response: any) => {
      if (1 === response.statusCode) {
        this.accounts = this.accounts.filter(x => x.id !== id);
        this.getAccounts();
      }
    }, (error) => {
    })
  }


  public onChange(e: Event): void {
    const keyWord = (e.target as HTMLInputElement).value;
    if ('' === keyWord) {
      this.accounts = this.Clone(this.orginalAccounts);
    }

    this.accounts = this.accounts.filter(x => x.fullName.toLowerCase().includes(keyWord.toLowerCase()));
  }


  public setAccountSource(accounts: AccountViewModel[]): void {
    this.dataSource = new MatTableDataSource<AccountViewModel>(accounts);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
