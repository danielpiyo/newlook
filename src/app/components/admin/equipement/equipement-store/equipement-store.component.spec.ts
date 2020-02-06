import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementStoreComponent } from './equipement-store.component';

describe('EquipementStoreComponent', () => {
  let component: EquipementStoreComponent;
  let fixture: ComponentFixture<EquipementStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
