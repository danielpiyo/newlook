import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserToken } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/users`, tokenModel);
  }
}
