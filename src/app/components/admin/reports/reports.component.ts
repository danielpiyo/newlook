import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EquipementService } from 'src/app/_service/equipement.service';
import { UserToken } from 'src/app/_model/user';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Settings } from 'src/app/shared/setting.model';
import { AppSettings } from 'src/app/shared/app.setting';
import { RequestService } from 'src/app/_service/request.service';

export interface Requests {
  id: number, category: string, department: string, rigion: string,
  deport: string, description: string, requestUsername: string,
  status: string, createdAt: Date, assigned: string, assignedBy: string,
  assignedTo: string, assignedAt: Date, escalated: string, escalatedBy: string,
  escalatedTo: string, escalatedAt: Date, assignedClosed: string, AssignedClosedAt: Date,
  escalatedClosed: string, escalatedClosedAt: Date, deleted: string, deletedBy: string,
  deletedAt: Date, closed: string, closedAt: Date, closedBy: string
}


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  userToken: UserToken = new UserToken();
  allRegionReq: [];
  region = false;
  department = false;
  stationSubscription: Subscription;
  categoryData: any;
  category = true;
  categorySubscription: Subscription;
  allCategories: any;
  availableCategories: any;
  categoryTotals: any;
  requests = false;
  allEquipements: [];
  equipementSubscription: Subscription;
  // /category + chart
  public categoryDataChart: any[];
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public settings: Settings;



  public displayedColumns = ['No', 'Region', 'Deport', 'Department', 'Category', 'Description', 'Status'];
  public displayedColumnsDepartment = ['No', 'Department', 'Category', 'Description', 'CreatedAt', 'Status'];

  public dataSource = new MatTableDataSource<Requests>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumnsRequest = ['number', 'RequestBy', 'Category', 'Description', 'Status', 'AssignedTo', 'AssignedAt', 'EscalatedTo', 'EscalatedAt'];

  public dataSourceRequest = new MatTableDataSource<Requests>();

  @ViewChild(MatSort, { static: true }) Eqsort: MatSort;
  @ViewChild(MatPaginator, { static: true }) Eqpaginator: MatPaginator;

  constructor(
    private reoprtService: EquipementService,
    public appSettings: AppSettings,
    private requestService: RequestService
  ) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
    this.getCategoryReport();
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getRegionReport();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceRequest.paginator = this.Eqpaginator;
    this.dataSourceRequest.sort = this.Eqsort;
    this.getRequestReport();
    // Object.assign(this.categoryDataChart);
  }

  getRegionReport() {
    this.stationSubscription = this.requestService.getAllrequest(this.userToken)
      .subscribe((res: []) => {
        this.allRegionReq = res;
        this.dataSource.data = this.allRegionReq as Requests[];
      }, error => {
        console.log('RegionErr', error);
      });
  }
  // go to station
  goToregion() {
    this.department = false;
    this.region = true;
    this.category = false;
    this.requests = false;

  }
  // department
  goTodepartment() {
    this.department = true;
    this.region = false;
    this.category = false;
    this.requests = false;

  }

  // filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // category
  getCategoryReport() {
    this.categorySubscription = this.reoprtService.getCategoryReport(this.userToken)
      .subscribe((res: []) => {
        this.allCategories = res;
        this.categoryDataChart = res;
       
      }, error => {
        console.log('categoryErrr', error);
      });
  }
  categoryReport() {
    this.category = true;
    this.region = false;
    this.department = false;
    this.requests = false;
  }
  public onSelect(event) {
    console.log(event);
  }
  // equipments
  getRequestReport() {
    this.equipementSubscription = this.requestService.getAllrequest(this.userToken)
      .subscribe((response: []) => {
        this.allEquipements = response;
        this.dataSourceRequest.data = this.allEquipements as Requests[];
      });
  }
  // filter for search
  applyFilterEq(filterValue: string) {
    this.dataSourceRequest.filter = filterValue.trim().toLowerCase();
  }

  // getEquipments
  getEquip() {
    this.category = false;
    this.region = false;
    this.department = false;
    this.requests = true;
  }

  // destroy subscriptions
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.stationSubscription) {
      this.stationSubscription.unsubscribe();
    }
    if (this.equipementSubscription) {
      this.equipementSubscription.unsubscribe();
    }
  }
}
