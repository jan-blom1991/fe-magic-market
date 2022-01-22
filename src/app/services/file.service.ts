import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/files';

  constructor(private http: HttpClient) {}

  addFilesToProduct(productId: number, files: FormData): Observable<void> {
    return this.http.post<void>(this.baseUrl + `?productId=${productId}`, files);
  }
}
