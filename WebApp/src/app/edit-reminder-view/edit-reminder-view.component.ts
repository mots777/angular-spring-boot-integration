import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { ReminderService } from '../services/reminder.service';
import { Note } from '../services/note';
import { Reminder } from '../services/reminder';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-reminder-view',
  templateUrl: './edit-reminder-view.component.html',
  styleUrls: ['./edit-reminder-view.component.css']
})
export class EditReminderViewComponent implements OnInit, OnDestroy {

  note: Note;
  reminder: Reminder;
  constructor(private dialogRef:MatDialogRef<EditReminderViewComponent>,
    private routerService:RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private reminderService:ReminderService, private notesService: NotesService) { 
     
    }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.noteId);
    this.reminder = this.note.reminders.find(reminder => reminder.reminderId === this.data.reminderId);
  }

  onUpdateReminder(reminder: Reminder): void {
    this.reminderService.updateReminder(reminder).subscribe();
    
    this.dialogRef.close();
  }

  findIndexByReminderId(reminderId: string) {
    return this.note.reminders.findIndex(reminder => reminder.reminderId === reminderId);
  }

  ngOnDestroy() {
    this.routerService.routeBack();
  }

  close() {
    this.dialogRef.close();
  }

}
