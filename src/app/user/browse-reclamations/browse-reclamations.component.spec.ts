import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseReclamationsComponent } from './browse-reclamations.component';

describe('BrowseReclamationsComponent', () => {
  let component: BrowseReclamationsComponent;
  let fixture: ComponentFixture<BrowseReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseReclamationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
