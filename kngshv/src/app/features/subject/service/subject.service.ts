import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LectureService } from '../../lecture/service/lecture.service';
import { SubjectViewModel } from '../models/subject-view-model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) { }

  public getSubject() {
    return this.httpClient.get(`${environment.localDomain}/api/Subjects`);
  }

  public createSubject(subject: SubjectViewModel){
    return this.httpClient.post(`${environment.localDomain}/api/Subjects`,subject);
  }

  public updateSubject(subject:SubjectViewModel){
    return this.httpClient.put(`${environment.localDomain}/api/Subjects/${subject.id}`,subject);
  }

  public deleteSubject(id:string){
    return this.httpClient.delete(`${environment.localDomain}/api/Subjects/${id}`);
  }

}
