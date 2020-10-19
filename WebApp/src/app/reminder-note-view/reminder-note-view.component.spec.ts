import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderNoteViewComponent } from './reminder-note-view.component';

describe('ReminderNoteViewComponent', () => {
  let component: ReminderNoteViewComponent;
  let fixture: ComponentFixture<ReminderNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderNoteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
