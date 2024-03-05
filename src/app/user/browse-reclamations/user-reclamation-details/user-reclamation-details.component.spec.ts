import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReclamationDetailsComponent } from './user-reclamation-details.component';

describe('UserReclamationDetailsComponent', () => {
  let component: UserReclamationDetailsComponent;
  let fixture: ComponentFixture<UserReclamationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReclamationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReclamationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
