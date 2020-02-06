import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EquipementService } from 'src/app/_service/equipement.service';
import { DataToStore, DataDamaged } from 'src/app/_model/allocate.model';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipement-repaire',
  templateUrl: './equipement-repaire.component.html',
  styleUrls: ['./equipement-repaire.component.css']
})
export class EquipementRepaireComponent implements OnInit {
  allEquipements: [];
  currentUserToken: UserToken = new UserToken();
  toStoreModel: DataToStore = new DataToStore();
  toDamageModel: DataDamaged = new DataDamaged();

  public displayedColumns = ['number', 'Category', 'Name', 'Brand', 'Type', 'Sereals', 'Details', 'Status'];

  public dataSource = new MatTableDataSource<Equipements>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private equipementService: EquipementService,
              private alertService: AlertService,
              private router: Router) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllRepairEquipements();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllRepairEquipements() {
    this.equipementService.getAllRepairEquipements(this.currentUserToken)
    .subscribe((response: []) => {
      this.allEquipements = response;
      this.dataSource.data = this.allEquipements as Equipements[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // sending Equipement to store
  // tslint:disable-next-line: variable-name
  sendToStore(equipement_id, category_id) {
    this.toStoreModel.category_id = category_id;
    this.toStoreModel.equipement_id = equipement_id;
    this.toStoreModel.token = this.currentUserToken.token;
    console.log('payloadStore', this.toStoreModel);
    this.equipementService.toStoreNow(this.toStoreModel)
    .subscribe((res) => {
      console.log('ToStore', res);
      this.router.navigate(['/admin/equi-store']);
      this.alertService.success('Succesfully sent to Store');
    }, error => {
      console.log('StoreErr', error);
    });
  }
  // sending equipement to damaged repository
// tslint:disable-next-line: variable-name
sendToDamaged(equipement_id, category_id) {
  this.toDamageModel.category_id = category_id;
  this.toDamageModel.equipement_id = equipement_id;
  this.toDamageModel.token = this.currentUserToken.token;
  this.equipementService.toDamagerNow(this.toDamageModel)
  .subscribe((res) => {
    console.log('ToDam', res);
    this.router.navigate(['/admin']);
    this.alertService.success('Succesfully Sent to Damaged Repository');
  }, error => {
    console.log('ErrDmaged', error);
  });
}
}

export interface Equipements {
  equipement_id: number;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_type: string;
  equipement_serial: string;
  details: string;
  created_by: string;
  status: string;
}
