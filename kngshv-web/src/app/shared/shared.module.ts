import { NgModule } from "@angular/core";
import { AntDesignModule } from "./ant-design.module";
import { ComfirmComponent } from "./components/comfirm/comfirm.component";

@NgModule({
  declarations: [
    ComfirmComponent
  ],
  imports: [
    AntDesignModule
  ],
  providers: [
  ],
  exports: [
    AntDesignModule
  ]
})
export class SharedModule { }
