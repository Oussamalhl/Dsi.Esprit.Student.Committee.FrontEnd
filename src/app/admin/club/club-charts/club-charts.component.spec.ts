import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubChartsComponent } from './club-charts.component';

describe('ClubChartsComponent', () => {
  let component: ClubChartsComponent;
  let fixture: ComponentFixture<ClubChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
