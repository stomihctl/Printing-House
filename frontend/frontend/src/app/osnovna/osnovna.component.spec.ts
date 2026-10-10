import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovnaComponent } from './osnovna.component';

describe('OsnovnaComponent', () => {
  let component: OsnovnaComponent;
  let fixture: ComponentFixture<OsnovnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsnovnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsnovnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
