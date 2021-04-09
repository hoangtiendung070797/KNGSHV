import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureSchedulesComponent } from './pages/lecture-schedules/lecture-schedules.component';
import { LectureScheduleRoutingModule } from './lecture-schedule.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    LectureScheduleRoutingModule,
    SharedModule,
    LectureScheduleRoutingModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  declarations: [
    LectureSchedulesComponent,
    CreateScheduleComponent
  ],
  entryComponents:[
    CreateScheduleComponent
  ]
})
export class LectureSchedulesModule { }
