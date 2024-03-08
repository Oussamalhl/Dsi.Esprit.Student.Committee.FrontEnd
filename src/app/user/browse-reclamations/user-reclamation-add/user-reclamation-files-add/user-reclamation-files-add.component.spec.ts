import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReclamationFilesAddComponent } from './user-reclamation-files-add.component';

describe('UserReclamationFilesAddComponent', () => {
  let component: UserReclamationFilesAddComponent;
  let fixture: ComponentFixture<UserReclamationFilesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReclamationFilesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReclamationFilesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
