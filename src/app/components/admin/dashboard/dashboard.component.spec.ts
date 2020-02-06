import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [MaterialModule, PanelMenuModule, RouterTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have title position', () => {
    expect(fixture.nativeElement.querySelector('[data-test="title"]').textContent).toContain('Zyptech Asset Management');
  });
  it('should position the dashbord into flex state with two sections', () => {
    expect(fixture.nativeElement.querySelector('.dashboard-holder')).toBeTruthy();
  });
  it('should have the menu section', () => {
    expect(fixture.nativeElement.querySelector('[data-test="menu-holder"]')).toBeTruthy();
  });
  it('should have the Content section', () => {
    expect(fixture.nativeElement.querySelector('[data-test="content-holder"]')).toBeTruthy();
  });
});
