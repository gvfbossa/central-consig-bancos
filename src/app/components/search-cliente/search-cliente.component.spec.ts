import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClienteComponent } from './search-cliente.component';

describe('SearchClienteComponent', () => {
  let component: SearchClienteComponent;
  let fixture: ComponentFixture<SearchClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
