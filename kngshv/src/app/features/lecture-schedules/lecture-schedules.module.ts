import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureSchedulesComponent } from './pages/lecture-schedules/lecture-schedules.component';
import { LectureScheduleRoutingModule } from './lecture-schedule.routing';

@NgModule({
  imports: [
    CommonModule,
    LectureScheduleRoutingModule
  ],
  declarations: [
    LectureSchedulesComponent
  ]
})
export class LectureSchedulesModule { }
