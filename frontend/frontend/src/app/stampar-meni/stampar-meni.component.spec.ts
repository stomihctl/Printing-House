import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamparMeniComponent } from './stampar-meni.component';

describe('StamparMeniComponent', () => {
  let component: StamparMeniComponent;
  let fixture: ComponentFixture<StamparMeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StamparMeniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StamparMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
