import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamparMojprofilComponent } from './stampar-mojprofil.component';

describe('StamparMojprofilComponent', () => {
  let component: StamparMojprofilComponent;
  let fixture: ComponentFixture<StamparMojprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StamparMojprofilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StamparMojprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
