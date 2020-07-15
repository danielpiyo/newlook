import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../_model/user';
import { environment } from 'src/environments/environment';
import { Request, ToaAssignRequest } from '../_model/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

   // closed request
   getAllrequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/allRequests`, tokenModel);
  }
  // open request
  getAllOpenRequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/openRequests`, tokenModel);
  }
   // Assigned request
   getAllAssignedRequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/assignedRequests`, tokenModel);
  }
   // Escalated request
   getAllEscalatedRequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/escalatedRequests`, tokenModel);
  }
  // closed request
  getAllClosedrequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/closedRequests`, tokenModel);
  }
// Deleted request
getAllDeletedrequest(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/deletedRequests`, tokenModel);
}

  // postrequest

  newRequest(requstModel: Request) {
    return this.http.post(`${environment.baseUrl}/newRequest`, requstModel);
  }
  // allocate request
  allocateRequest(requstModel: ToaAssignRequest) {
    return this.http.post(`${environment.baseUrl}/newRequest`, requstModel);
  }
}
