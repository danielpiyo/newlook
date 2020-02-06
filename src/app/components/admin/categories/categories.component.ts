import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserToken, User } from 'src/app/_model/user';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CategoriesService } from 'src/app/_service/categories.service';
import { AlertService } from 'src/app/_service';
import { NewCategory } from 'src/app/_model/category.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// category interface
export interface Categories {
  category_id: number;
  category_name: string;
  details: string;
  created_by: number;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allCategoriies: [];
  currentUserToken: UserToken = new UserToken();

  public displayedColumns = ['number', 'CategoryId', 'Name', 'Details'];

  public dataSource = new MatTableDataSource<Categories>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private categoriesService: CategoriesService, public dialog: MatDialog) {
    this.currentUserToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }

  ngOnInit() {
    this.getAllCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllCategories() {
    this.categoriesService.getAllCategories(this.currentUserToken)
    .subscribe((response: []) => {
      this.allCategoriies = response;
      this.dataSource.data = this.allCategoriies as Categories[];
    });
  }

// filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewCategory() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(NewCategoryModal, { width: '50%' });
  }
}


// child component for adding new category
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'new-category-modal',
  templateUrl: 'new-category.modal.component.html',
  styleUrls: ['./categories.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class NewCategoryModal {
  currentUser: User;
  userToken: UserToken = new UserToken();
  categoryModel: NewCategory = new NewCategory();

  constructor(
    public dialogRef: MatDialogRef<NewCategoryModal>,
    private alertService: AlertService,
    private messageService: MessageService,
    private categoryService: CategoriesService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

  }

  addCategoryNow() {
    this.categoryModel.token = this.userToken.token;
    this.categoryService.newCategory(this.categoryModel)
    .subscribe((response) => {
        this.alertService.success('Category Added Succesfully');
        console.log('NewCat', response);
        this.router.navigate(['/admin/categories']);
        this.messageService.add({
          severity: 'info', summary: `Succesfully Added New Category`,
          detail: this.categoryModel.category_name
        });
        this.onNoClick();
    }, error => {
      console.log('catError', error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
