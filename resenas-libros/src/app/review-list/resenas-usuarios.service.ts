import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://127.0.0.1:8000/resenas-usuarios-libros/';

  constructor(private http: HttpClient) {}

  getReviewsWithUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}