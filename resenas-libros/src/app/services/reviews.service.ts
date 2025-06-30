import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private readonly API_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/libros/`);
  }

  getResenas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/resenas-usuarios-libros/`);
  }

  createResena(resena: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/resenas/`, resena);
  }
}
