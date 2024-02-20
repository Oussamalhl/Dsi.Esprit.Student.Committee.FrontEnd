import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationChartsComponent } from './reclamation-charts.component';

describe('ReclamationChartsComponent', () => {
  let component: ReclamationChartsComponent;
  let fixture: ComponentFixture<ReclamationChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
