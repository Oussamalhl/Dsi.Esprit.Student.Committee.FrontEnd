import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddParticipantsComponent } from './event-add-participants.component';

describe('EventAddParticipantsComponent', () => {
  let component: EventAddParticipantsComponent;
  let fixture: ComponentFixture<EventAddParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAddParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
