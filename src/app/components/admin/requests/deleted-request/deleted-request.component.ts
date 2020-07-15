import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RequestService } from 'src/app/_service/request.service';

@Component({
  selector: 'app-deleted-request',
  templateUrl: './deleted-request.component.html',
  styleUrls: ['./deleted-request.component.css']
})
export class DeletedRequestComponent implements OnInit {

  allDeletedRequests: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'Category', 'Deport', 'Description', 'Status', 'CreatedBy', 'DeletedBy', 'DeletedAt'];

  public dataSource = new MatTableDataSource<Requests>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private equipementService: RequestService) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllDeletedRequest();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllDeletedRequest() {
    this.equipementService.getAllClosedrequest(this.currentUserToken)
      .subscribe((response: []) => {
        this.allDeletedRequests = response;
        this.dataSource.data = this.allDeletedRequests as Requests[];
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

