import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubShowFilesComponent } from './club-show-files.component';

describe('ClubShowFilesComponent', () => {
  let component: ClubShowFilesComponent;
  let fixture: ComponentFixture<ClubShowFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubShowFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubShowFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
