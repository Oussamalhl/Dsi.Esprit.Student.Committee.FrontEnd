import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShowFilesComponent } from './event-show-files.component';

describe('EventShowFilesComponent', () => {
  let component: EventShowFilesComponent;
  let fixture: ComponentFixture<EventShowFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShowFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShowFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
