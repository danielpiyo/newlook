import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EquipementService } from 'src/app/_service/equipement.service';
import { NewEquipement } from 'src/app/_model/equipement.model';
import { AlertService } from 'src/app/_service';
import { CategoriesService } from 'src/app/_service/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent implements OnInit {
  allEquipements: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'Category', 'Name', 'Brand', 'Type', 'Sereals', 'Details', 'Status'];

  public dataSource = new MatTableDataSource<Equipements>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private equipementService: EquipementService, private dialog: MatDialog) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllEquipements();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllEquipements() {
    this.equipementService.getAllEquipements(this.currentUserToken)
    .subscribe((response: []) => {
      this.allEquipements = response;
      this.dataSource.data = this.allEquipements as Equipements[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // new
addNewEquipement() {
  // tslint:disable-next-line: no-use-before-declare
  this.dialog.open(NewEquipementModal, { width: '60%' });
}

}

export interface Equipements {
  equipement_id: number;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_type: string;
  equipement_serial: string;
  details: string;
  created_by: string;
  status: string;
}


// child component for adding new Equipement
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-equipement-modal',
  templateUrl: 'new-equipement.modal.component.html',
  styleUrls: ['./equipement.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NewEquipementModal {
  userToken: UserToken = new UserToken();
  equipementModel: NewEquipement = new NewEquipement();
  categories: any;

  constructor(
    public dialogRef: MatDialogRef<NewEquipementModal>,
    private alertService: AlertService,
    private equipementService: EquipementService,
    private categoryService: CategoriesService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.getAllCategories();
  }
getAllCategories() {
  this.categoryService.getAllCategories(this.userToken)
  .subscribe((response) => {
    this.categories = response;
    console.log('catrespo', this.categories);
  }, error => {
    console.log('catErr', error);
  });
}

 addNewEquipementNow() {
  this.equipementModel.token = this.userToken.token;
  this.equipementService.addNewEquipement(this.equipementModel)
  .subscribe((response) => {
    console.log('Added', response);
    this.router.navigate(['/admin/equipements']);
    this.alertService.success('Equipement Added Succesfully');
    this.onNoClick();
  }, error => {
    console.log('EqpErr', error);
    this.alertService.error('Error Adding Equipement');
  });
 }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
