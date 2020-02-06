import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EquipementService } from 'src/app/_service/equipement.service';
import { RequestService } from 'src/app/_service/request.service';
import { Subscription } from 'rxjs';
import { DatatoAllocate } from 'src/app/_model/allocate.model';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipement-store',
  templateUrl: './equipement-store.component.html',
  styleUrls: ['./equipement-store.component.css']
})
export class EquipementStoreComponent implements OnInit {

  state = 'normal';
  allEquipements: [];
  currentUserToken: UserToken = new UserToken();
  requestSubcription: Subscription;
  allUsers: [];
  selectedEquipementId: number;
  toAllocateModel: DatatoAllocate = new DatatoAllocate();

  public displayedColumns = ['number', 'Category', 'Name', 'Brand', 'Type', 'Sereals', 'Details', 'Status'];

  public dataSource = new MatTableDataSource<Equipements>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private equipementService: EquipementService,
              private requestService: RequestService,
              private alertService: AlertService,
              private router: Router) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllStoreEquipements();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this .getUserRequest();
  }

  getAllStoreEquipements() {
    this.equipementService.getAllStoreEquipements(this.currentUserToken)
    .subscribe((response: []) => {
      this.allEquipements = response;
      this.dataSource.data = this.allEquipements as Equipements[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /****
   * allocation process
   */
  // tslint:disable-next-line: variable-name
  needToAllocate(equipement_id) {
    this.state = 'allocate';
    this.selectedEquipementId = equipement_id;
    this .getUserRequest();
  }

  // get user request
  getUserRequest() {
   this.requestSubcription = this.requestService.getAllOpenRequest(this.currentUserToken)
   .subscribe((response: []) => {
    this.allUsers = response;
    console.log(this.allUsers);
   }, error => {
     console.log('UserErr', error);
   });
  }
  // tslint:disable-next-line: variable-name
  allocateNow(equipement_id, category_id, allocate_to) {
    this.toAllocateModel.allocate_to = allocate_to;
    this.toAllocateModel.category_id = category_id;
    this.toAllocateModel.equipement_id = equipement_id;
    this.toAllocateModel.token = this.currentUserToken.token;
    this.equipementService.allocateNow(this.toAllocateModel)
    .subscribe((res) => {
      console.log('Allocat', res);
      this.router.navigate(['/admin/equi-allocated']);
      this.alertService.success('Successfully Allocated');
    }, error => {
      console.log('ErrAll', error);
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  // ngOnDestroy() {
  //   this.requestSubcription.unsubscribe();
  // }
}

export interface Equipements {
  equipement_id: number;
  category_id: number;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_type: string;
  equipement_serial: string;
  details: string;
  created_by: string;
  status: string;
}

