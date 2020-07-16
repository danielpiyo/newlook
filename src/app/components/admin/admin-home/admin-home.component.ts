import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserToken } from 'src/app/_model/user';
import { EquipementService } from 'src/app/_service/equipement.service';
import { Subscription } from 'rxjs';
import { Settings } from 'src/app/shared/setting.model';
import { AppSettings } from 'src/app/shared/app.setting';
import { RequestService } from 'src/app/_service/request.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  data: any;
  dataDough: any;
  userToken: UserToken = new UserToken();
  totalRequests: any;
  totalOpen: any;
  totalAssigned: any;
  totalClosed: any;
  totalEscalated: any;
  //
  
  constructor(private messageService: MessageService,
    private requestService: RequestService,
    private equipmentService: EquipementService) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));

  }

  ngOnInit() {
    this.damageCharts();
    // this.doughnuts();
    this.getTotalActiveOpen();
    this.getTotalRequests();
    this.getTotalAssigned();
    this.getTotalEscalated();
    this.getTotalClosed();
    this.getMonths();
  }

  getMonths() {
    
  }
  damageCharts() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Navishion Requests',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Network Request',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: true,
          borderColor: '#565656',

        },
        {
          label: 'Email Request',
          data: [28, 28, 40, 19, 36, 27, 10],
          fill: true,
          borderColor: '#378fe7',

        }
      ]
    };
  }

  onSelect(event: any) {
    console.log(event);
  }

  selectData(event: { element: { _datasetIndex: string | number; _index: string | number; }; }) {
    this.messageService.add({
      severity: 'info', summary: `Selected`,
      detail: this.data.datasets[event.element._datasetIndex].data[event.element._index]
    });
  }

  // reports values
  getTotalRequests() {
    this.equipmentService.getTotalRequest(this.userToken)
      .subscribe((res) => {
        this.totalRequests = res[0].total_requests;
      }, error => {
        console.log('UserError', error);
      });
  }
  getTotalActiveOpen() {
    this.equipmentService.getTotalActiveOpen(this.userToken)
      .subscribe((res) => {
        this.totalOpen = res[0].total_open;
      });
  }

  getTotalAssigned() {
    this.equipmentService.getTotalAssigned(this.userToken)
      .subscribe((res) => {
        this.totalAssigned = res[0].total_assigned;
      });
  }

  getTotalClosed() {
    this.equipmentService.getTotalClosed(this.userToken)
      .subscribe((res) => {
        this.totalClosed = res[0].total_closed;
      });
  }

  getTotalEscalated() {
    this.equipmentService.getTotalEscalated(this.userToken)
      .subscribe((res) => {
        this.totalEscalated = res[0].total_escalated;
      });
  }
}
