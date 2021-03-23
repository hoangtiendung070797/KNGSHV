import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from './models/user-login';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  titleTop = 'Đăng nhập';
  hide = true;
  public userName: string;
  public password: string;
  public rememberMe: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initialize();
  }

  public initialize(): void {

  }

  public login(): void {

    let loginModel: UserLogin = new UserLogin();

    loginModel.userName = this.userName;
    loginModel.password = this.password;

    this.loginService.login(loginModel).subscribe((result: any) => {
      localStorage.setItem('access_token', result.token);
      this.router.navigateByUrl("/main");
    }, (error) => {
      alert("password is valid");
    });


  }

}
