import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationShowFilesComponent } from './reclamation-show-files.component';

describe('ReclamationShowFilesComponent', () => {
  let component: ReclamationShowFilesComponent;
  let fixture: ComponentFixture<ReclamationShowFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationShowFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationShowFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
