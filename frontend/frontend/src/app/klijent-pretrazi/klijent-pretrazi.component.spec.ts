import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPretraziComponent } from './klijent-pretrazi.component';

describe('KlijentPretraziComponent', () => {
  let component: KlijentPretraziComponent;
  let fixture: ComponentFixture<KlijentPretraziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentPretraziComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentPretraziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
