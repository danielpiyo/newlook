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
getTotalActiveUsers(tokenModel: UserToken) {
    return this.http.post(`${environment.baseUrl}/totalUsers`, tokenModel);
}

// total active equipements
getTotalActiveEquipements(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/activeEquipements`, tokenModel);
}

// total damaged equipements
getTotaldamagedEquipements(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalDamaged`, tokenModel);
}

// total in store
getTotalEquipementsStore(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalInStore`, tokenModel);
}

// total equipements under repair
getTotalEquipementsRepair(tokenModel: UserToken) {
  return this.http.post(`${environment.baseUrl}/totalRepair`, tokenModel);
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
