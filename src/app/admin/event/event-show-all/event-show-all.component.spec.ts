import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShowAllComponent } from './event-show-all.component';

describe('EventShowAllComponent', () => {
  let component: EventShowAllComponent;
  let fixture: ComponentFixture<EventShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
