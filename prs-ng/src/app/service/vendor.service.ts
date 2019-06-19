import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';
import { Vendor } from '@model/vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  url: string = "http://localhost:8080/vendors/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(vendorId: string): Observable<JsonResponse> {
    return this.http.get(this.url + vendorId) as Observable<JsonResponse>;
  }

  create(vendor: Vendor): Observable<JsonResponse> {
    return this.http.post(this.url, vendor) as Observable<JsonResponse>;
  }

  edit(vendor: Vendor): Observable<JsonResponse> {
    return this.http.put(this.url, vendor) as Observable<JsonResponse>;
  }

  remove(vendor: Vendor): Observable<JsonResponse> {
    return this.http.delete(this.url + vendor.id) as Observable<JsonResponse>;
  }
}
