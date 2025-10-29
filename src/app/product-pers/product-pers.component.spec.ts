import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPersComponent } from './product-pers.component';

describe('ProductPersComponent', () => {
  let component: ProductPersComponent;
  let fixture: ComponentFixture<ProductPersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
