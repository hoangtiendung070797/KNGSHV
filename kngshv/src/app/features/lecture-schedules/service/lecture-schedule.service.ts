import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LectureScheduleViewModel } from '../models/lecture-schedules-view-model';

@Injectable({
  providedIn: 'root'
})
export class LectureScheduleService {

  constructor(private httpClient: HttpClient) { }

  public getSchedule(){
    return this.httpClient.get(`${environment.localDomain}/api/LectureSchedules`)
  }

  public createSchedule(schedule:LectureScheduleViewModel){
    return this.httpClient.post(`${environment.localDomain}/api/LectureSchedules`,schedule)
  }

  public updateSchedule(schedule:LectureScheduleViewModel){
    return this.httpClient.put(`${environment.localDomain}/api/LectureSchedules/${schedule.id}`,schedule)
  }

  public deleteSchedule(id){
    return this.httpClient.delete(`${environment.localDomain}/api/LectureSchedules/${id}`)
  }

}
