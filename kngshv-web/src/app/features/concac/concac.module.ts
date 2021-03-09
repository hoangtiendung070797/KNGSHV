import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AntDesignModule } from "src/app/shared/ant-design.module";
import { ConcacComponent } from "./concac.component";
import { ConCacRoutingModule } from "./concac.routing";

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    ConCacRoutingModule
  ],
  declarations: [ConcacComponent],
})
export class ConCacModule { }
