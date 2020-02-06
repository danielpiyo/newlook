import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../_model/user';
import { environment } from 'src/environments/environment';
import { NewStation } from '../_model/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor( private http: HttpClient) { }

  getAllStation(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/stations`, tokenModel);
  }

  // new station
  addNewStation(stationModel: NewStation) {
    return this.http.post(`${environment.baseUrl}/newStation`, stationModel);
  }
}
