import { CurrencyPipe, DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  constructor(

    public router: Router,
    public currencyPipe: CurrencyPipe,
    public datePipe: DatePipe
  ) { }


  /* Clone để tránh trùng ô nhớ  */
  public Clone(object) {
    const ObjStr = JSON.stringify(object);
    return JSON.parse(ObjStr);
  }

  /* Kiểm tra 2 đối tượng có giống nhau không  */
  public Equals(object1, object2) {
    const ObjStr1 = JSON.stringify(object1);
    const ObjStr2 = JSON.stringify(object2);
    if (ObjStr1 === ObjStr2) {
      return true;
    }
    return false;
  }

  /* Chuyển đổi từ số sang định dang tiền tệ VNĐ  */
  public ConvertToMoney(money: string) {
    if (money) {
      const convertMoney = `${money}`.replace(/\,/g, "");
      return this.currencyPipe
        .transform(convertMoney, "", "", "1.0-0")
        .replace("$", "");
    }
  }

  public ConvertToNumber(moneyAsString: string) {
    if (moneyAsString) {
      return Number(moneyAsString.replace(/\,/g, ""));
    }
  }

  public ConvertToDate(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  public GoTo(path: string) {
    this.router.navigateByUrl(path);
  }

  public ConvertObjectToString(object) {
    return JSON.stringify(object);
  }

  public ConvertStringToObject(str) {
    return JSON.parse(str);
  }

}

