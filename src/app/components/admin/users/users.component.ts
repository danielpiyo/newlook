import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UsersService } from 'src/app/_service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'Station', 'Department', 'Section', 'Username', 'Name', 'Email', 'Age', 'Employment'];

  public dataSource = new MatTableDataSource<Users>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private usersService: UsersService) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this.usersService.getAllUsers(this.currentUserToken)
    .subscribe((response: []) => {
      this.allUsers = response;
      this.dataSource.data = this.allUsers as Users[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Users {
  user_id: number;
  department_name: string;
  section_name: string;
  station_name: string;
  username: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  employment_year: string;
  created_date: Date;
  created_by: number;
}
