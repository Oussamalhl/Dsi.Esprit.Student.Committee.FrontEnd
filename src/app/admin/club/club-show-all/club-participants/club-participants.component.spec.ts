import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubParticipantsComponent } from './club-participants.component';

describe('ClubParticipantsComponent', () => {
  let component: ClubParticipantsComponent;
  let fixture: ComponentFixture<ClubParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
