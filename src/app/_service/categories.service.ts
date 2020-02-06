import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../_model/user';
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
  // add new category

  newCategory(categoryModel: NewCategory) {
    return this.http.post(`${environment.baseUrl}/newCategory`, categoryModel);
  }
}
