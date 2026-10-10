import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamparNarudzbeComponent } from './stampar-narudzbe.component';

describe('StamparNarudzbeComponent', () => {
  let component: StamparNarudzbeComponent;
  let fixture: ComponentFixture<StamparNarudzbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StamparNarudzbeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StamparNarudzbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
