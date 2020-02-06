import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserToken } from 'src/app/_model/user';
import { StationService } from 'src/app/_service/station.service';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';
import { NewStation } from 'src/app/_model/station.model';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  allStations: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'StationId', 'Name', 'Incharge', 'CreatedDate', 'Details'];

  public dataSource = new MatTableDataSource<Stations>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private stationService: StationService, public dialog: MatDialog) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllStations();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllStations() {
    this.stationService.getAllStation(this.currentUserToken)
    .subscribe((response: []) => {
      this.allStations = response;
      this.dataSource.data = this.allStations as Stations[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNewStation() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(NewStationModal, { width: '60%' });
  }
}

export interface Stations {
  station_id: number;
  station_name: string;
  station_incharge: string;
  details: string;
  created_by: string;
  created_date: Date;
}


// child component for adding new station
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-station-modal',
  templateUrl: 'new-station.modal.component.html',
  styleUrls: ['./station.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NewStationModal {
  userToken: UserToken = new UserToken();
  stationModel: NewStation = new NewStation();

  constructor(
    public dialogRef: MatDialogRef<NewStationModal>,
    private alertService: AlertService,
    private stationService: StationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

  }

  addStationNow() {
   this.stationModel.token = this.userToken.token;
   this.stationService.addNewStation(this.stationModel)
   .subscribe((response) => {
     this.alertService.success('New Station Succesfully added');
     console.log('NewStation', response);
     this.router.navigate(['/admin/station']);
     this.onNoClick();
   }, error => {
     console.log('NewStatioErr', error);
   });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
