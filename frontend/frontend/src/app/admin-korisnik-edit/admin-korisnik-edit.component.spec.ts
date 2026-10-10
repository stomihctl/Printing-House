import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKorisnikEditComponent } from './admin-korisnik-edit.component';

describe('AdminKorisnikEditComponent', () => {
  let component: AdminKorisnikEditComponent;
  let fixture: ComponentFixture<AdminKorisnikEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKorisnikEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKorisnikEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
