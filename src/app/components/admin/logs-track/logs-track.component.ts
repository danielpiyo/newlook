import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { EquipementService } from 'src/app/_service/equipement.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

// allocated interface
export interface Allocated {
  id: number;
  log_type: string;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_serial: string;
  equipement_type: string;
  status: string;
  allocated_to: string;
  allocated_by: string;
  allocated_date: Date;
  log_date: Date;
}

// damaged
export interface Damaged {
  id: number;
  log_type: string;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_serial: string;
  equipement_type: string;
  status: string;
  damaged_rendared_by: string;
  damaged_date: Date;
  log_date: Date;
}

export interface Repaired {
  id: number;
  log_type;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_serial: string;
  equipement_type: string;
  status: string;
  company_repair: string;
  date_to_repair: Date;
  to_repair_by: string;
  log_date; date;
}
@Component({
  selector: 'app-logs-track',
  templateUrl: './logs-track.component.html',
  styleUrls: ['./logs-track.component.css']
})
export class LogsTrackComponent implements OnInit {
  userToken: UserToken = new UserToken();
  allocated = true;
  allAllocated: [];
  allocatedSubscription: Subscription;
  repair = false;
  allRepaired: [];
  repaireSubscription: Subscription;
  damaged = false;
  allDamaged: [];
  damagedSubscription: Subscription;

  public displayedColumns = ['No', 'Category', 'Equipement', 'Brand', 'Model', 'Serial', 'allocatedTo', 'AllocationDate'];
  public displayedColumnsDamaged = ['No', 'Category', 'Equipement', 'Brand', 'Model', 'Serial', 'YesBy', 'DamagedDate'];
  public displayedColumnsRepaired = ['No', 'Category', 'Equipement', 'Brand', 'Model', 'Serial', 'Company', 'RepairDate', 'SentBy'];

  public dataSource = new MatTableDataSource<Allocated>();
  public dataSourceDamaged = new MatTableDataSource<Damaged>();
  public dataSourceRepair = new MatTableDataSource<Repaired>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sortDamaged: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginatorDamaged: MatPaginator;
    @ViewChild(MatSort, { static: true }) sortRepaired: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginatorRepaired: MatPaginator;

  constructor(private logsService: EquipementService) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllocated();
    this.getRepaired();
    this.getDamaged();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceDamaged.paginator = this.paginatorDamaged;
    this.dataSourceDamaged.sort = this.sortDamaged;
    this.dataSourceRepair.paginator = this.paginatorRepaired;
    this.dataSourceRepair.sort = this.sortRepaired;
  }

  getAllocated() {
    this.allocatedSubscription = this.logsService.getLogsAllocated(this.userToken)
      .subscribe((response: []) => {
        this.allAllocated = response;
        console.log( this.allAllocated);
        this.dataSource.data = this.allAllocated as Allocated[];
      }, error => {
        console.log('LogsAllocErr', error);
      });
  }

  // filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDamaged() {
    this.damagedSubscription = this.logsService.getLogsDamaged(this.userToken)
      .subscribe((res: []) => {
        this.allDamaged = res;
        this.dataSourceDamaged.data = this.allDamaged as Damaged[];
      }, error => {
        console.log('damagedErr', error);
      });
  }
  // filter for search
  applyFilterDamaged(filterValue: string) {
    this.dataSourceDamaged.filter = filterValue.trim().toLowerCase();
  }

  getRepaired() {
    this.repaireSubscription = this.logsService.getLogsRepaired(this.userToken)
      .subscribe((res: []) => {
        this.allRepaired = res;
        this.dataSourceRepair.data = this.allRepaired as Repaired[];
      }, error => {
        console.log('ReparErr', error);
      });
  }

  applyFilterRepaired(filterValue: string) {
    this.dataSourceRepair.filter = filterValue.trim().toLowerCase();
  }

  goToDamaged() {
    this.allocated = false;
    this.damaged = true;
    this.repair = false;
  }
  goToAllocated() {
    this.allocated = true;
    this.damaged = false;
    this.repair = false;
  }
  goToRepaired() {
    this.allocated = false;
    this.damaged = false;
    this.repair = true;
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.allocatedSubscription) {
      this.allocatedSubscription.unsubscribe();
    }
    if (this.damagedSubscription) {
      this.damagedSubscription.unsubscribe();
    }
    if (this.repaireSubscription) {
      this.repaireSubscription.unsubscribe();
    }
  }
}
