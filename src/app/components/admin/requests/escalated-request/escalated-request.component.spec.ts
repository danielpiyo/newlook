import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalatedRequestComponent } from './escalated-request.component';

describe('EscalatedRequestComponent', () => {
  let component: EscalatedRequestComponent;
  let fixture: ComponentFixture<EscalatedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalatedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalatedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
