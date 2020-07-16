import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RequestService } from 'src/app/_service/request.service';
import { ToaCloseRequest } from 'src/app/_model/request.model';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-request',
  templateUrl: './assigned-request.component.html',
  styleUrls: ['./assigned-request.component.css']
})
export class AssignedRequestComponent implements OnInit {
  allAssignedRequests: [];
  currentUserToken: UserToken = new UserToken();
  toCloseModel: ToaCloseRequest = new ToaCloseRequest();

  public displayedColumns = ['number', 'Category', 'Deport', 'Description', 'Status', 'AssignedAt', 'AssignedTo', 'Action'];

  public dataSource = new MatTableDataSource<Requests>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private requestService: RequestService,
     private alertService: AlertService,
     private router: Router
     ) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllAssinedRequest();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAssinedRequest() {
    this.requestService.getAllAssignedRequest(this.currentUserToken)
      .subscribe((response: []) => {
        this.allAssignedRequests = response;
        this.dataSource.data = this.allAssignedRequests as Requests[];
      });
  }

  // filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  needToClose(id: number) {
    this.toCloseModel.req_id = id;
    this.toCloseModel.token = this.currentUserToken.token
    this.requestService.closeRequest(this.toCloseModel).subscribe((res) => {
      console.log(res);
      this.alertService.success('Succesfully closed');
      this.router.navigate(['/admin'])
    });
  }
}


export interface Requests {
  id: number, category: string, department: string, rigion: string,
  deport: string, description: string, requestUsername: string,
  status: string, createdAt: Date, assigned: string, assignedBy: string,
  assignedTo: string, assignedAt: Date, escalated: string, escalatedBy: string,
  escalatedTo: string, escalatedAt: Date, assignedClosed: string, AssignedClosedAt: Date,
  escalatedClosed: string, escalatedClosedAt: Date, deleted: string, deletedBy: string,
  deletedAt: Date, closed: string, closedAt: Date, closedBy: string
}
