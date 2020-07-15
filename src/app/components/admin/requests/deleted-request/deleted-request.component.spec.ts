import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedRequestComponent } from './deleted-request.component';

describe('DeletedRequestComponent', () => {
  let component: DeletedRequestComponent;
  let fixture: ComponentFixture<DeletedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
