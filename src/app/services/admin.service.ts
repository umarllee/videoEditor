import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:7777/api';  // Əgər URL fərqli isə dəyişdirin

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/category`);
  }

  deleteCategories(id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/category/` + id);
  }

  saveCategory(data: any) {
    return this.http.post<any>(`${this.baseUrl}/category`, data);
  }

  saveVideo(data: any) {
    return this.http.post<any>(`${this.baseUrl}/video`, data);
  }

}
