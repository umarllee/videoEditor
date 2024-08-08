import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:7777/api';  // Əgər URL fərqli isə dəyişdirin

  constructor(private http: HttpClient) {}

  getAllVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/video`);
  }

  getAllCategories(): Observable<any[]> {  // Yeni metod əlavə edildi
    return this.http.get<any[]>(`${this.baseUrl}/category`);
  }

  deleteVideo(id:number) {  // Yeni metod əlavə edildi
    return this.http.get<any[]>(`${this.baseUrl}/video/`+id);
  }
}
