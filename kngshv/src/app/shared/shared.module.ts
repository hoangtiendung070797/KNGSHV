import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { ComfirmComponent } from "./components/comfirm/comfirm.component";
import { MaterialDesginModule } from "./material-desgin.module";
import { BaseService } from "./services/base.service";

@NgModule({
  declarations: [
    ComfirmComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialDesginModule,
    FlexLayoutModule,
    CommonModule
  ],
  providers: [
    BaseService,
    CurrencyPipe,
    DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialDesginModule,
    FlexLayoutModule,
    CommonModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
