import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from './subject.routing';
import { SubjectComponent } from './pages/subject/subject.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSubjectComponent } from './components/subject-dialog/create-subject/create-subject.component';
import { UpdateSubjectComponent } from './components/subject-dialog/update-subject/update-subject.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SubjectRoutingModule
  ],
  declarations: [
    SubjectComponent,
    CreateSubjectComponent,
    UpdateSubjectComponent

  ],

  providers: [

  ]
})
export class SubjectModule { }
