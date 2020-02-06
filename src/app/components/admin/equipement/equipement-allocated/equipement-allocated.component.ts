import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EquipementService } from 'src/app/_service/equipement.service';
import { CategoriesService } from 'src/app/_service/categories.service';
import { AlertService } from 'src/app/_service';
import { DataToRepair, DataDamaged } from 'src/app/_model/allocate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipement-allocated',
  templateUrl: './equipement-allocated.component.html',
  styleUrls: ['./equipement-allocated.component.css']
})
export class EquipementAllocatedComponent implements OnInit {

  allEquipements: [];
  currentUserToken: UserToken = new UserToken();
  sendDamage: DataDamaged = new DataDamaged();

  public displayedColumns = ['number', 'Category', 'Name', 'Brand', 'Type', 'Sereals', 'Details', 'Status', 'Action'];

  public dataSource = new MatTableDataSource<Equipements>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private equipementService: EquipementService,
              private dialog: MatDialog,
              private alertService: AlertService,
              private router: Router) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllAllocatedEquipements();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAllocatedEquipements() {
    this.equipementService.getAllAllocatedEquipements(this.currentUserToken)
    .subscribe((response: []) => {
      this.allEquipements = response;
      this.dataSource.data = this.allEquipements as Equipements[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // send to repair
  // tslint:disable-next-line: variable-name
  sendToRepair(equipement_id, category_id) {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(RepairEquipementModal, {data: {
      equipement_id,
      category_id
    }});
  }
  // send to damaged
  sendToDamaged(equipement_id, category_id) {
    this.sendDamage.category_id = category_id;
    this.sendDamage.equipement_id = equipement_id;
    this.sendDamage.token = this.currentUserToken.token;
    this.equipementService.toDamagerNow(this.sendDamage)
    .subscribe((res) => {
      this.alertService.success('Succesfully Sent to damaged Repository');
      console.log('Todamage', res);
      this.router.navigate(['/admin']);
    }, error => {
      console.log('ToDamageErr', error);
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

//
// child component for sending equipement to repair
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-repair-modal',
  templateUrl: 'new-repair.modal.component.html',
  styleUrls: ['./equipement-allocated.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class RepairEquipementModal {
  userToken: UserToken = new UserToken();
  repairModel: DataToRepair = new DataToRepair();
  categories: any;

  constructor(
    public dialogRef: MatDialogRef<RepairEquipementModal>,
    private alertService: AlertService,
    private equipementService: EquipementService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

  }

  sendNow() {
    this.repairModel.category_id = this.data.category_id;
    this.repairModel.equipement_id = this.data.equipement_id;
    this.repairModel.token = this.userToken.token;
    console.log('torepair', this.repairModel);
    this.equipementService.toRepairNow(this.repairModel)
    .subscribe((res) => {
      console.log('Repair', res);
      this.router.navigate(['/admin/equi-repaire']);
      this.alertService.success('Sent for Repair');
      this.onNoClick();
    }, error => {
      console.log('ErrReap', error);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
