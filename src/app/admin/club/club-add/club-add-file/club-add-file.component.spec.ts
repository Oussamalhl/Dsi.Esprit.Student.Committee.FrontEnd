import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAddFileComponent } from './club-add-file.component';

describe('ClubAddFileComponent', () => {
  let component: ClubAddFileComponent;
  let fixture: ComponentFixture<ClubAddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubAddFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
