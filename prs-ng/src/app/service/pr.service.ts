import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequest } from '@model/pr.class';

@Injectable({
  providedIn: 'root'
})
export class PrService {

  url: string = "http://localhost:8080/purchase-requests/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(prId: string): Observable<JsonResponse> {
    return this.http.get(this.url + prId) as Observable<JsonResponse>;
  }

  create(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.post(this.url + "submit-new", pr) as Observable<JsonResponse>;
  }

  edit(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url, pr) as Observable<JsonResponse>;
  }

  remove(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.delete(this.url + pr.id) as Observable<JsonResponse>;
  }

  submit(pr: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + "submit-review", pr) as Observable<JsonResponse>;
  }

  review(userId: string): Observable<JsonResponse> {
    return this.http.get(this.url + "list-review/" + userId) as Observable<JsonResponse>;
  }
}
