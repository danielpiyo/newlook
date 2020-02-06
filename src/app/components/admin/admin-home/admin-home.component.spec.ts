import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent ],
      imports: [MaterialModule, ChartModule, ToastModule],
      providers: [MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have infrmative dashbord', () => {
    expect(fixture.nativeElement.querySelector('[data-test="inform"]')).toBeTruthy();
  });

  it('should have chart', () => {
    expect(fixture.nativeElement.querySelector('[data-test="chart"]')).toBeTruthy();
  });
});
