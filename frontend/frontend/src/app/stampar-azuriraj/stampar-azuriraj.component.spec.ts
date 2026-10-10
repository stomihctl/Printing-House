import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamparAzurirajComponent } from './stampar-azuriraj.component';

describe('StamparAzurirajComponent', () => {
  let component: StamparAzurirajComponent;
  let fixture: ComponentFixture<StamparAzurirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StamparAzurirajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StamparAzurirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
