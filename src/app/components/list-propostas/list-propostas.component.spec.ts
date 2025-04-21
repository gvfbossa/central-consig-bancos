import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropostasComponent } from './list-propostas.component';

describe('ListPropostasComponent', () => {
  let component: ListPropostasComponent;
  let fixture: ComponentFixture<ListPropostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPropostasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPropostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
