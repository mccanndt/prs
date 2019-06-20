import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '@model/json-response.class';
import { User } from '@model/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/users/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(userId: string): Observable<JsonResponse> {
    return this.http.get(this.url + userId) as Observable<JsonResponse>;
  }

  create(user: User): Observable<JsonResponse> {
    return this.http.post(this.url, user) as Observable<JsonResponse>;
  }

  edit(user: User): Observable<JsonResponse> {
    return this.http.put(this.url, user) as Observable<JsonResponse>;
  }

  remove(user: User): Observable<JsonResponse> {
    return this.http.delete(this.url + user.id) as Observable<JsonResponse>;
  }

  login(user: User): Observable<JsonResponse> {
    return this.http.post(this.url + "authenticate", user) as Observable<JsonResponse>;
  }
}
