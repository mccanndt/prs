import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "http://localhost:8080/products/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(productId: string): Observable<JsonResponse> {
    return this.http.get(this.url + productId) as Observable<JsonResponse>;
  }

  create(product: Product): Observable<JsonResponse> {
    return this.http.post(this.url, product) as Observable<JsonResponse>;
  }

  edit(product: Product): Observable<JsonResponse> {
    return this.http.put(this.url, product) as Observable<JsonResponse>;
  }

  remove(product: Product): Observable<JsonResponse> {
    return this.http.delete(this.url + product.id) as Observable<JsonResponse>;
  }
}
