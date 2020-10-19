import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReminderOpenerComponent } from './add-reminder-opener.component';

describe('AddReminderOpenerComponent', () => {
  let component: AddReminderOpenerComponent;
  let fixture: ComponentFixture<AddReminderOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReminderOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReminderOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
