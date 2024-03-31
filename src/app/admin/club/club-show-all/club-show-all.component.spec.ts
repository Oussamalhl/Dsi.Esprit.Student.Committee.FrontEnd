import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubShowAllComponent } from './club-show-all.component';

describe('ClubShowAllComponent', () => {
  let component: ClubShowAllComponent;
  let fixture: ComponentFixture<ClubShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
