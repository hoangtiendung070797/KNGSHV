import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent extends BaseService implements OnInit {
  titleTop = 'Tài khoản';

  public functions = [
    { name: 'Trang chủ', link: '...', icon: 'home' },
    { name: 'Danh mục tài khoản', link: '...', icon: 'manage_accounts' },
    { name: 'Danh mục giáo viên', link: '...', icon: 'school' },
    { name: 'Danh mục học viên', link: '...', icon: 'child_care' },
    { name: 'Danh mục môn học', link: '...', icon: 'child_care' },
    { name: 'Danh mục khoá học', link: '...', icon: 'child_care' },
    { name: 'Danh mục lớp học', link: '...', icon: 'child_care' },
    { name: 'Danh mục học viên', link: '...', icon: 'child_care' },
  ];
  constructor(
    private loginService: LoginService,
    public router: Router,
    public currencyPipe: CurrencyPipe,
    public datePipe: DatePipe
  ) {
    super(router, currencyPipe, datePipe);
  }

  ngOnInit() { }

  selectedItem(e) {
    console.log(e);
  }
  selectedLabel(e) {
    console.log(e);
  }

  goToRuleScreen() {
    this.router.navigate['/rule'];
  }

}
