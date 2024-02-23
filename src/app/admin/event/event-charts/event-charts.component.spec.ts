import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChartsComponent } from './event-charts.component';

describe('EventChartsComponent', () => {
  let component: EventChartsComponent;
  let fixture: ComponentFixture<EventChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
