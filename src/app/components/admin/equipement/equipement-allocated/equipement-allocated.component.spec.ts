import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementAllocatedComponent } from './equipement-allocated.component';

describe('EquipementAllocatedComponent', () => {
  let component: EquipementAllocatedComponent;
  let fixture: ComponentFixture<EquipementAllocatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementAllocatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementAllocatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
