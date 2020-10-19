import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryOpenerComponent } from './add-category-opener.component';

describe('AddCategoryOpenerComponent', () => {
  let component: AddCategoryOpenerComponent;
  let fixture: ComponentFixture<AddCategoryOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
