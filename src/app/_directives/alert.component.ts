import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_service/index';

@Component({
    //moduleId: module.id.toString(),
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}