import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsTrackComponent } from './logs-track.component';

describe('LogsTrackComponent', () => {
  let component: LogsTrackComponent;
  let fixture: ComponentFixture<LogsTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
