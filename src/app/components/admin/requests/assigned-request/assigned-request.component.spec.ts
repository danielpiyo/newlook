import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedRequestComponent } from './assigned-request.component';

describe('AssignedRequestComponent', () => {
  let component: AssignedRequestComponent;
  let fixture: ComponentFixture<AssignedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
