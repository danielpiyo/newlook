import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SectionService } from 'src/app/_service/section.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserToken } from 'src/app/_model/user';
import { NewSection } from 'src/app/_model/section.model';
import { DepartmentService } from 'src/app/_service/department.service';
import { AlertService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  allSections: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'Department', 'Name', 'Incharge', 'CreatedDate', 'Details'];

  public dataSource = new MatTableDataSource<Sections>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private sectionService: SectionService, private dialog: MatDialog) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllSections();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllSections() {
    this.sectionService.getAllSections(this.currentUserToken)
    .subscribe((response: []) => {
      this.allSections = response;
      this.dataSource.data = this.allSections as Sections[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // new
  addNewSection() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(NewSectionModal, { width: '60%' });
  }
}

export interface Sections {
  section_id: number;
  department_name: string;
  section_name: string;
  section_incharge: string;
  details: string;
  created_date: Date;
}


// child component for adding new section
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-section-modal',
  templateUrl: 'new-section.modal.component.html',
  styleUrls: ['./section.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NewSectionModal {
  userToken: UserToken = new UserToken();
  sectionModel: NewSection = new NewSection();
  departments: any;

  constructor(
    public dialogRef: MatDialogRef<NewSectionModal>,
    private alertService: AlertService,
    private sectionService: SectionService,
    private departmentService: DepartmentService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.getDepartments();
  }

getDepartments() {
  this.departmentService.getAllDepartments(this.userToken)
  .subscribe((response) => {
    this.departments = response;
  }, error => {
    console.log('deptError', error);
  });
}

  addSectionNow() {
   this.sectionModel.token = this.userToken.token;
   this.sectionService.addNewSection(this.sectionModel)
   .subscribe((response) => {
     this.alertService.success('New Section Succesfully added');
     console.log('NewSection', response);
     this.router.navigate(['/admin/section']);
     this.onNoClick();
   }, error => {
     console.log('NewSectionErr', error);
   });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
