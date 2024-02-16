import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationAddFileComponent } from './reclamation-add-file.component';

describe('ReclamationAddFileComponent', () => {
  let component: ReclamationAddFileComponent;
  let fixture: ComponentFixture<ReclamationAddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationAddFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
