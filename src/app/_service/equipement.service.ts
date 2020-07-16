import { Injectable } from '@angular/core';

import { UserToken } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewEquipement } from '../_model/equipement.model';
import { DatatoAllocate, DataToRepair, DataDamaged, DataToStore } from '../_model/allocate.model';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  constructor(private http: HttpClient) { }

  getAllEquipements(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/equipements`, tokenModel);
  }

// allocated
getAllAllocatedEquipements(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/allocatedEquipements`, tokenModel);
}

// under repair
getAllRepairEquipements(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/repaireEquipements`, tokenModel);
}

// store
getAllStoreEquipements(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/storeEquipements`, tokenModel);
}

// add new
addNewEquipement(equipementMode: NewEquipement) {
  return this.http.post(`${environment.baseUrl}/newEquipement`, equipementMode);
}
// allocate

allocateNow(allocateModel: DatatoAllocate) {
  return this.http.post(`${environment.baseUrl}/allocate`, allocateModel);
}

// to repair
toRepairNow(repairModel: DataToRepair) {
  return this.http.post(`${environment.baseUrl}/toRepair`, repairModel);
}

// to damage
toDamagerNow(damageModel: DataDamaged) {
  return this.http.post(`${environment.baseUrl}/damaged`, damageModel);
}
// to store
toStoreNow(storeModel: DataToStore) {
  return this.http.post(`${environment.baseUrl}/toStore`, storeModel);
}

// report home
getTotalRequest(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/totalRequests`, tokenModel);
}

// total active equipements
getTotalActiveOpen(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalOpen`, tokenModel);
}

// total damaged equipements
getTotalClosed(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalClosed`, tokenModel);
}

// total in store
getTotalAssigned(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalAssigned`, tokenModel);
}

// total equipements under repair
getTotalEscalated(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalEscalated`, tokenModel);
}
// stationEquipement
getStationEquip(userToken: UserToken) {
    return this.http.post(`${environment.baseUrl}/stationReport`, userToken);
}

// category report
getCategoryReport(userToken: UserToken) {
  return this.http.post(`${environment.baseUrl}/categoryReport`, userToken);
}

// logs
// alllocated llogs
getLogsAllocated(userToken: UserToken) {
  return this.http.post(`${environment.baseUrl}/logsEquipementAllocated`, userToken);
}

// repaired logs
getLogsRepaired(userToken: UserToken) {
  return this.http.post(`${environment.baseUrl}/logsEquipementRepair`, userToken);
}
// damaged logs
getLogsDamaged(userToken: UserToken) {
  return this.http.post(`${environment.baseUrl}/logsEquipementDamaged`, userToken);
}
}
