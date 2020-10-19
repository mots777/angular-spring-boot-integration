import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReminderViewComponent } from './add-reminder-view.component';

describe('AddReminderViewComponent', () => {
  let component: AddReminderViewComponent;
  let fixture: ComponentFixture<AddReminderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReminderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReminderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
