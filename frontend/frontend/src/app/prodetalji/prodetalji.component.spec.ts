import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdetaljiComponent } from './prodetalji.component';

describe('ProdetaljiComponent', () => {
  let component: ProdetaljiComponent;
  let fixture: ComponentFixture<ProdetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
