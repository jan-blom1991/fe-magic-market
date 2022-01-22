import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Product} from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private messageSource = new BehaviorSubject<Product>(null);
  currentMessage = this.messageSource.asObservable();
  private baseUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addProduct(product: Product): Observable<number> {
    return this.http.post<number>(this.baseUrl, product, {responseType: 'json'});
  }

  editProduct(product: Product): Observable<void> {
    return this.http.put<void>(this.baseUrl, product);
  }

  removeProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + `${category}`);
  }
}
