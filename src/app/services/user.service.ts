import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Product} from '../domain/product';
import {User} from '../domain/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private messageSource = new BehaviorSubject<User>(null);
  currentMessage = this.messageSource.asObservable();
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUser(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addUser(user: User): Observable<number> {
    return this.http.post<number>(this.baseUrl, user, {responseType: 'json'});
  }
}
