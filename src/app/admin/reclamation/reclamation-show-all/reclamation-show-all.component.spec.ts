import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationShowAllComponent } from './reclamation-show-all.component';

describe('ReclamationShowAllComponent', () => {
  let component: ReclamationShowAllComponent;
  let fixture: ComponentFixture<ReclamationShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
