import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentArhivaComponent } from './klijent-arhiva.component';

describe('KlijentArhivaComponent', () => {
  let component: KlijentArhivaComponent;
  let fixture: ComponentFixture<KlijentArhivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentArhivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentArhivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
