import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultClienteComponent } from './result-cliente.component';

describe('ResultClienteComponent', () => {
  let component: ResultClienteComponent;
  let fixture: ComponentFixture<ResultClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
