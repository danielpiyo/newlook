import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RequestService } from 'src/app/_service/request.service';

@Component({
  selector: 'app-assigned-request',
  templateUrl: './assigned-request.component.html',
  styleUrls: ['./assigned-request.component.css']
})
export class AssignedRequestComponent implements OnInit {
  allAssignedRequests: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'Category', 'Deport', 'Description', 'Status', 'AssignedAt', 'AssignedTo'];

  public dataSource = new MatTableDataSource<Requests>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private equipementService: RequestService) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllAssinedRequest();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAssinedRequest() {
    this.equipementService.getAllAssignedRequest(this.currentUserToken)
      .subscribe((response: []) => {
        this.allAssignedRequests = response;
        this.dataSource.data = this.allAssignedRequests as Requests[];
      });
  }

  // filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
