import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentProdetaljiComponent } from './klijent-prodetalji.component';

describe('KlijentProdetaljiComponent', () => {
  let component: KlijentProdetaljiComponent;
  let fixture: ComponentFixture<KlijentProdetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentProdetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentProdetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
