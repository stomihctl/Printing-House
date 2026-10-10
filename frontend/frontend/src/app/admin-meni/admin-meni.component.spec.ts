import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMeniComponent } from './admin-meni.component';

describe('AdminMeniComponent', () => {
  let component: AdminMeniComponent;
  let fixture: ComponentFixture<AdminMeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMeniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
