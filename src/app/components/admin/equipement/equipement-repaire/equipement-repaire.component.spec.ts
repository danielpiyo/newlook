import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementRepaireComponent } from './equipement-repaire.component';

describe('EquipementRepaireComponent', () => {
  let component: EquipementRepaireComponent;
  let fixture: ComponentFixture<EquipementRepaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementRepaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementRepaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
