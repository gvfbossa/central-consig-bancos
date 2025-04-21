import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDadosComponent } from './base-dados.component';

describe('BaseDadosComponent', () => {
  let component: BaseDadosComponent;
  let fixture: ComponentFixture<BaseDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
