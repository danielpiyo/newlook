import { Component, OnInit } from '@angular/core';
import { UserToken } from 'src/app/_model/user';
import { Subscription } from 'rxjs';
import { Settings } from 'src/app/shared/setting.model';
import { EquipementService } from 'src/app/_service/equipement.service';
import { AppSettings } from 'src/app/shared/app.setting';

@Component({
  selector: 'app-advanced-category',
  templateUrl: './advanced-category.component.html',
  styleUrls: ['./advanced-category.component.css']
})
export class AdvancedCategoryComponent implements OnInit {

  userToken: UserToken  = new UserToken();
  categorySubscription: Subscription;
  allCategories: any;
  public categoryDataChart: any[];
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060', '#4bc0c0', '#565656',
            '#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0', '#565656']
  };
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = true;
  public settings: Settings;

  availableCategories: any;
  categoryTotals: any;
  constructor(private equipmentService: EquipementService,
              public appSettings: AppSettings) {
                this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
                this.settings = this.appSettings.settings;

  }

  ngOnInit() {
    this.getCategoriesReport();
    // Object.assign(this.categoryDataChart);
  }

  getCategoriesReport() {
    this.categorySubscription = this.equipmentService.getCategoryReport(this.userToken)
    .subscribe((res: []) => {
      this.allCategories = res;
      this.categoryDataChart =  res;
      // this.availableCategories = this.allCategories.map(element => element.name);
      // this.categoryTotals = this.allCategories.map(element => element.value);
      this.allCategories.forEach(element => {
        this.availableCategories = element.name;
        this.categoryTotals = element.value;
        // console.log(this.allCategories);
        // console.log(this.availableCategories);
        // console.log( this.categoryTotals );
      });
    }, error => {
      console.log('categoryErrr', error);
    });
  }
}
