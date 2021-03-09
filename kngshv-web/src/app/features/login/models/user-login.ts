export class UserLogin {
  public userName: string;
  public password: string;

  public UserLogin(userName: string = "", password: string = "") {
    this.userName = userName;
    this.password = password;
  }

}
