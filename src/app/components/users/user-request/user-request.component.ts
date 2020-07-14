import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/_model/request.model';
import { UserToken, DeportRegion } from 'src/app/_model/user';
import { RequestService } from 'src/app/_service/request.service';
import { AlertService } from 'src/app/_service';
import { CategoriesService } from 'src/app/_service/categories.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {
    requestModel: Request = new Request();
    userToken: UserToken = new UserToken();
    categorySubscription: Subscription;
    departmentSubscription: Subscription;
    regionSubscription: Subscription;
    deportSubscription: Subscription;
    regionDeport : DeportRegion = new DeportRegion()
    allCategories: [];
    alldepartments: [];
    allregions: [];
    allDeports: [];

  constructor(private requestService: RequestService,
              private alertService: AlertService,
              private router: Router,
              private categoryServices: CategoriesService) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
   }

  ngOnInit() {
    this.getAllCategories();
    this.getAllDepartments();    
    this.getAllRegions();
  }
// pulling categories
getAllCategories() {
this.categorySubscription = this.categoryServices.getAllCategories(this.userToken)
.subscribe((response: []) => {
  this.allCategories = response;
}, error => {
  console.log('categoErr', error);
});
}
// pulling depaertments
getAllDepartments() {
  this.departmentSubscription = this.categoryServices.getAllDepartments(this.userToken)
  .subscribe((response: []) => {
    this.alldepartments = response;
  }, error => {
    console.log('DepartErr', error);
  });
  }

  // pulling depaertments
getAllRegions() {
  this.regionSubscription = this.categoryServices.getAllRegions(this.userToken)
  .subscribe((response: []) => {
    this.allregions = response;
  }, error => {
    console.log('RegionErr', error);
  });
  }

  // pulling depaertments
getAllDeports(rig_id: any) {
   this.regionDeport.region = rig_id;
   this.regionDeport.token = this.userToken.token;
  this.deportSubscription = this.categoryServices.getAllDeports(this.regionDeport)
  .subscribe((response: []) => {
    this.allDeports = response;
  }, error => {
    console.log('DepoErr', error);
  });
  }
  

// posting
  submit() {
    this.requestModel.token = this.userToken.token;
    console.log('RequestPayload', this.requestModel);
    this.requestService.newRequest(this.requestModel)
    .subscribe((res) => {
      console.log(res);
      this.alertService.success('Request Posted Succesfully');
      this.router.navigate(['/user'])
    }, error => {
      this.alertService.error('error Posting Request');
      console.log('requestError', error);
    });
  }

  reset() {
    window.location.reload();
  }
}
