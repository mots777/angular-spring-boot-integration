import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { ReminderService } from '../services/reminder.service';
import { Note } from '../services/note';
import { Reminder } from '../services/reminder';
import { NotesService } from '../services/notes.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-add-reminder-view',
  templateUrl: './add-reminder-view.component.html',
  styleUrls: ['./add-reminder-view.component.css']
})
export class AddReminderViewComponent implements OnInit, OnDestroy {

  reminder: Reminder = new Reminder();
  note: Note;
  constructor(private dialogRef: MatDialogRef<AddReminderViewComponent>,
    private routerService: RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private reminderService: ReminderService, private notesService: NotesService,
    private appService: AppService) {

  }
  ngOnInit() {
    if(this.data) {
      this.note = this.notesService.getNoteById(this.data.noteId);
    } else {
      this.note = <Note>{noteTitle: "New Note"};
    }
  }

  onAddReminder(reminder: Reminder) {
    this.reminderService.addReminder(reminder).subscribe(savedReminder => {
      reminder.reminderId = savedReminder.reminderId;
      this.note.reminders ? this.note.reminders.push(reminder) : this.note.reminders = [reminder];
      this.notesService.editNote(this.note).subscribe();     
    });
    
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(this.data) {
      this.routerService.routeBack();
    }
    this.appService.setDisableSelectReminderNoteTaker(false);
  }

  close(reminder?: Reminder) {
    this.dialogRef.close();
  }


}
