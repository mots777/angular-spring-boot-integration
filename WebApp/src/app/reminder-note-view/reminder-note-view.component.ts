import { Component, OnInit } from '@angular/core';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-reminder-note-view',
  templateUrl: './reminder-note-view.component.html',
  styleUrls: ['./reminder-note-view.component.css']
})
export class ReminderNoteViewComponent implements OnInit {

  note: Note;
  reminderNotes: Array<Note> = [];
  notes: Array<Note> = [];
  constructor(private notesService: NotesService, private appService: AppService) {
   }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.findNotesWithReminders(data),
      error => console.log(error)
    );
  }

  findNotesWithReminders(dbNotes) {
    this.notes = dbNotes;
    if(this.notes) {
      this.reminderNotes = this.notes.filter(note => {
        if(note.reminders.length > 0){
          return true;
        }
      });
    }
  }

}
