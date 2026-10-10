import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentMojprofilComponent } from './klijent-mojprofil.component';

describe('KlijentMojprofilComponent', () => {
  let component: KlijentMojprofilComponent;
  let fixture: ComponentFixture<KlijentMojprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentMojprofilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentMojprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
