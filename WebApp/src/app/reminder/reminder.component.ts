import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Reminder } from '../services/reminder';
import { Note } from '../services/note';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  @Input()
  reminder: Reminder = <Reminder>{};

  @Input()
  note: Note = <Note>{};

  @Input()
  isEditMode: boolean;

  @Output()
  addReminder: EventEmitter<Reminder> = new EventEmitter();

  @Output()
  updateReminder: EventEmitter<Reminder> = new EventEmitter();

  @Output()
  cancel: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitReminder(reminderForm: NgForm) {
    if (reminderForm.valid) {
      const currentReminder: Reminder = reminderForm.value;

      if (this.isEditMode) {
        this.updateReminder.emit(currentReminder);
      } else {
        this.addReminder.emit(currentReminder);
      }
    }
  }

  close() {
    this.cancel.emit(true);
  }

}
