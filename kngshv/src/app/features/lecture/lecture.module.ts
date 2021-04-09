import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LectureRoutingModule } from './lecture.routing';
import { LectureService } from './service/lecture.service';
import { LectureComponent } from './pages/lecture/lecture.component';
import { UpdateLectureComponent } from './components/lecture-dialog/update-lecture/update-lecture.component';
import { CreateLectureComponent } from './components/lecture-dialog/create-lecture/create-lecture.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LectureRoutingModule


  ],
  declarations: [
    LectureComponent,
    UpdateLectureComponent,
    CreateLectureComponent
  ],
  providers: [
    RoleGuardService,
    AuthGuardService,
    LectureService
  ],
  entryComponents:[
    UpdateLectureComponent,
    CreateLectureComponent
  ]
})
export class LectureModule { }
