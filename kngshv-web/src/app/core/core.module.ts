import { NgModule } from "@angular/core";
import { AntDesignModule } from "../shared/ant-design.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    AntDesignModule
  ],
  providers: [],
  exports: [
    AntDesignModule
  ]
})
export class CoreModule { }
