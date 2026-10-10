import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamparLicitacijeComponent } from './stampar-licitacije.component';

describe('StamparLicitacijeComponent', () => {
  let component: StamparLicitacijeComponent;
  let fixture: ComponentFixture<StamparLicitacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StamparLicitacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StamparLicitacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
