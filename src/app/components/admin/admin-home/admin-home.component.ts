import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserToken } from 'src/app/_model/user';
import { EquipementService } from 'src/app/_service/equipement.service';
import { Subscription } from 'rxjs';
import { Settings } from 'src/app/shared/setting.model';
import { AppSettings } from 'src/app/shared/app.setting';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  data: any;
  dataDough: any;
  userToken: UserToken = new UserToken();
  totalUsers: any;
  totalActiveEq: any;
  totalInstore: any;
  totalDamaged: any;
  totalRepair: any;

  constructor(private messageService: MessageService,
              private equipmentService: EquipementService) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));

  }

  ngOnInit() {
    this.damageCharts();
    // this.doughnuts();
    this.getTotalActiveEquip();
    this.getTotalUsers();
    this.getTotalDamaged();
    this.getTotalEquipeRepaire();
    this.getTotalEquipStore();
  }

  damageCharts() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Allocation Requests',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Reallocation Request',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: true,
          borderColor: '#565656',

        }
      ]
    };
  }

  onSelect(event) {
    console.log(event);
  }

  selectData(event) {
    this.messageService.add({
      severity: 'info', summary: `Selected`,
      detail: this.data.datasets[event.element._datasetIndex].data[event.element._index]
    });
  }

  // reports values
  getTotalUsers() {
    this.equipmentService.getTotalActiveUsers(this.userToken)
      .subscribe((res) => {
        this.totalUsers = res[0].total_users;
      }, error => {
        console.log('UserError', error);
      });
  }
  getTotalActiveEquip() {
    this.equipmentService.getTotalActiveEquipements(this.userToken)
      .subscribe((res) => {
        this.totalActiveEq = res[0].total_equipements;
      });
  }

  getTotalEquipStore() {
    this.equipmentService.getTotalEquipementsStore(this.userToken)
      .subscribe((res) => {
        this.totalInstore = res[0].total_equipements_store;
      });
  }

  getTotalDamaged() {
    this.equipmentService.getTotaldamagedEquipements(this.userToken)
      .subscribe((res) => {
        this.totalDamaged = res[0].total_equipements_damage;
      });
  }

  getTotalEquipeRepaire() {
    this.equipmentService.getTotalEquipementsRepair(this.userToken)
      .subscribe((res) => {
        this.totalRepair = res[0].total_equipements_repair;
      });
  }
}
