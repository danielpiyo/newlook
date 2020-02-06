import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../_model/user';
import { environment } from 'src/environments/environment';
import { Request } from '../_model/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  // open request
  getAllOpenRequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/openRequests`, tokenModel);
  }
  // closed request
  getAllClosedrequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/closedRequests`, tokenModel);
  }
  // postrequest

  newRequest(requstModel: Request) {
    return this.http.post(`${environment.baseUrl}/newRequest`, requstModel);
  }
}
