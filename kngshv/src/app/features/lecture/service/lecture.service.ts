import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LectureViewModel } from '../models/lecture-view-model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private httpClient: HttpClient) { }
  public getLectures(){
    return this.httpClient.get(`${environment.localDomain}/api/Lectures`);
  }

  public updateLecture(lecture : LectureViewModel){
    return this.httpClient.put(`${environment.localDomain}/api/Lectures/${lecture.id}`,lecture);
  }

  public deleteLecture(id:string){
    return this.httpClient.delete(`${environment.localDomain}/api/Lectures/${id}`);
  }

  public createLecture(lecture: LectureViewModel){
    return this.httpClient.post(`${environment.localDomain}/api/Lectures`,lecture);
  }

}
