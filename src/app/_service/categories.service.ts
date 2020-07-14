import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken, DeportRegion } from '../_model/user';
import { environment } from 'src/environments/environment';
import { NewCategory } from '../_model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/categories`, tokenModel);
  }
  getAllDepartments(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/departments`, tokenModel);
  }
  getAllRegions(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/regions`, tokenModel);
  }
  getAllDeports(deportModel: DeportRegion) {
    return this.http.post(`${environment.baseUrl}/deports`, deportModel);
  }
  // add new category

  newCategory(categoryModel: NewCategory) {
    return this.http.post(`${environment.baseUrl}/newCategory`, categoryModel);
  }
}
