import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedCategoryComponent } from './advanced-category.component';

describe('AdvancedCategoryComponent', () => {
  let component: AdvancedCategoryComponent;
  let fixture: ComponentFixture<AdvancedCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
