import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReclamationAddComponent } from './user-reclamation-add.component';

describe('UserReclamationAddComponent', () => {
  let component: UserReclamationAddComponent;
  let fixture: ComponentFixture<UserReclamationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReclamationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReclamationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
