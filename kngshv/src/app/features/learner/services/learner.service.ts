import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LearnerViewModel } from '../models/learner-view-model';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {

  constructor(private httpClient: HttpClient) { }

  public getLearner(){
    return this.httpClient.get(`${environment.localDomain}/api/Learners`);
  }

  public updateLearner(leaner:LearnerViewModel){
    return this.httpClient.put(`${environment.localDomain}/api/Learners/${leaner.id}`,leaner);
  }

  public deleteLearner(id: string){
    return this.httpClient.delete(`${environment.localDomain}/api/Learners/${id}`);
  }

  public createLearner(learner:LearnerViewModel){
    return this.httpClient.post(`${environment.localDomain}/api/Learners`,learner);
  }

}
