import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/members/');
  }


  private baseUrl = 'http://localhost:8000/api/';  

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}login/`;
    return this.http.post(url, { username, password });
  }
}
