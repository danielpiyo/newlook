import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../_model/user';
import { environment } from 'src/environments/environment';
import { NewDepartment } from '../_model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAllDepartments(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/departments`, tokenModel);
  }
  // new department
  addNewDepartment(departmentModel: NewDepartment) {
    return this.http.post(`${environment.baseUrl}/newDepartment`, departmentModel);
  }
}
