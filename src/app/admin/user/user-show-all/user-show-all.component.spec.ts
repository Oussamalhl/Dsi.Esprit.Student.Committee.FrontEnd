import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowAllComponent } from './user-show-all.component';

describe('UserShowAllComponent', () => {
  let component: UserShowAllComponent;
  let fixture: ComponentFixture<UserShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
