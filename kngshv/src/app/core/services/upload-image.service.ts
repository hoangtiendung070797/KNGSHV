import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private httpClient: HttpClient) { }

  public uploadImage(formData) {
    return this.httpClient.post(`${environment.localDomain}/api/Upload`, formData);
  }

}
