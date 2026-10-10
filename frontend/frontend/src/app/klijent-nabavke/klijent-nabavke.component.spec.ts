import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentNabavkeComponent } from './klijent-nabavke.component';

describe('KlijentNabavkeComponent', () => {
  let component: KlijentNabavkeComponent;
  let fixture: ComponentFixture<KlijentNabavkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentNabavkeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentNabavkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
