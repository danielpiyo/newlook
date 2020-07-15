import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RequestService } from 'src/app/_service/request.service';
import { UsersService } from 'src/app/_service/users.service';
import { ToaAssignRequest } from 'src/app/_model/request.model';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-request',
  templateUrl: './open-request.component.html',
  styleUrls: ['./open-request.component.css']
})
export class OpenRequestComponent implements OnInit {
  allOpenRequests: [];
  allUsers: any;
  state = '';
  toAssignModel : ToaAssignRequest = new ToaAssignRequest();
  currentUserToken: UserToken = new UserToken();
  selectedId: number;

  public displayedColumns = ['number', 'Category', 'Deport', 'Description', 'Status', 'CreatedAt', 'Action'];

  public dataSource = new MatTableDataSource<Requests>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private requestService: RequestService,
     private userService: UsersService,
     private alertservice: AlertService,
     private router: Router
     ) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllOpenRequest();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllOpenRequest() {
    this.requestService.getAllOpenRequest(this.currentUserToken)
      .subscribe((response: []) => {
        this.allOpenRequests = response;
        this.dataSource.data = this.allOpenRequests as Requests[];
      });
  }

  // filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  needToAllocate(id){
    this.selectedId = id;
    this.getICTOUsers();
    this.state = 'allocate';
  }
  getICTOUsers(){
    this.userService.getAllUsers(this.currentUserToken).
    subscribe((response) =>{
      this.allUsers = response
    }, 
    error =>{
      console.log(error)
    })
  }
  allocateNow(id, username){
    console.log(id, username)
    this.toAssignModel.req_id = id;
    this.toAssignModel.username = username;
    this.requestService.allocateRequest(this.toAssignModel)
    .subscribe((res)=>{
      this.alertservice.success('Succesfully Assigned the Request');
    },
    error =>{
      console.log(error);
    })
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

