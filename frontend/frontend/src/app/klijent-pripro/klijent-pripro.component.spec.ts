import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPriproComponent } from './klijent-pripro.component';

describe('KlijentPriproComponent', () => {
  let component: KlijentPriproComponent;
  let fixture: ComponentFixture<KlijentPriproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentPriproComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentPriproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
