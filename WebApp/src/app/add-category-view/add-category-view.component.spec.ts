import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryViewComponent } from './add-category-view.component';

describe('AddCategoryViewComponent', () => {
  let component: AddCategoryViewComponent;
  let fixture: ComponentFixture<AddCategoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
