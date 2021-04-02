import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogViewModel } from '../models/blog-view-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

  public getBolgTypes(){
    return this.httpClient.get(`${environment.localDomain}/api/BlogTypes`);
  }
  public getBlogs(){
    return this.httpClient.get(`${environment.localDomain}/api/Blogs`);
  }

  public createBlog(blog: BlogViewModel){
    return this.httpClient.post(`${environment.localDomain}/api/Blogs`,blog);
  }

  public updateBlog(blog: BlogViewModel){
    return this.httpClient.put(`${environment.localDomain}/api/Blogs/${blog.id}`,blog);
  }

  public deleteBlog(id:string){
    return this.httpClient.delete(`${environment.localDomain}/api/Blogs/${id}`);
  }



}
