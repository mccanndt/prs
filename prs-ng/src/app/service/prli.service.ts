import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';
import { PurchaseRequestLineItem } from '@model/prli.class';

@Injectable({
  providedIn: 'root'
})
export class PrliService {

  url: string = "http://localhost:8080/purchase-request-line-items/";

  constructor(private http: HttpClient) { }

  getByPurchaseRequest(prId: string): Observable<JsonResponse> {
    return this.http.get(this.url + "lines-for-pr/" + prId) as Observable<JsonResponse>;
  }

  create(prli: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.post(this.url, prli) as Observable<JsonResponse>;
  }

  edit(prli: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.put(this.url, prli) as Observable<JsonResponse>;
  }

  remove(prli: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.delete(this.url + prli.id) as Observable<JsonResponse>;
  }
}
