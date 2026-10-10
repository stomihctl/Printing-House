import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamparProizvodiComponent } from './stampar-proizvodi.component';

describe('StamparProizvodiComponent', () => {
  let component: StamparProizvodiComponent;
  let fixture: ComponentFixture<StamparProizvodiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StamparProizvodiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StamparProizvodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
