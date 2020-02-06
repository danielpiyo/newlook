import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentService } from 'src/app/_service/department.service';
import { NewDepartment } from 'src/app/_model/department.model';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  allDepartments: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'DepartmentId', 'Name', 'Incharge', 'CreatedDate', 'Details'];

  public dataSource = new MatTableDataSource<Departments>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private departmentService: DepartmentService, public dialog: MatDialog) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllDepartments();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments(this.currentUserToken)
    .subscribe((response: []) => {
      this.allDepartments = response;
      this.dataSource.data = this.allDepartments as Departments[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
// new
addNewDepartment() {
  // tslint:disable-next-line: no-use-before-declare
  this.dialog.open(NewDepartmentModal, { width: '60%' });
}

}

export interface Departments {
  department_id: number;
  department_name: string;
  department_incharge: string;
  details: string;
  created_by: number;
  created_date: Date;
}


// child component for adding new station
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-department-modal',
  templateUrl: 'new-department.modal.component.html',
  styleUrls: ['./department.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NewDepartmentModal {
  userToken: UserToken = new UserToken();
  departmentModel: NewDepartment = new NewDepartment();

  constructor(
    public dialogRef: MatDialogRef<NewDepartmentModal>,
    private alertService: AlertService,
    private departmentService: DepartmentService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

  }

  addSDepartmentNow() {
   this.departmentModel.token = this.userToken.token;
   this.departmentService.addNewDepartment(this.departmentModel)
   .subscribe((response) => {
     this.alertService.success('New Station Succesfully added');
     console.log('NewDepart', response);
     this.router.navigate(['/admin/department']);
     this.onNoClick();
   }, error => {
     console.log('NewDepartErr', error);
   });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
