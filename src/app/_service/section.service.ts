import { Injectable } from '@angular/core';
import { UserToken } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewSection } from '../_model/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  getAllSections(tokenModel: UserToken) {
     return this.http.post(`${environment.baseUrl}/sections`, tokenModel);
  }
  // add new
  addNewSection(sectionModel: NewSection) {
    return this.http.post(`${environment.baseUrl}/newSection`, sectionModel);
  }
}
