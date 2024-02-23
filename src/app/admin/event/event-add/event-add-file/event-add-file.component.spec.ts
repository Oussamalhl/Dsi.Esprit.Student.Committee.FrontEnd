import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddFileComponent } from './event-add-file.component';

describe('EventAddFileComponent', () => {
  let component: EventAddFileComponent;
  let fixture: ComponentFixture<EventAddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAddFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
