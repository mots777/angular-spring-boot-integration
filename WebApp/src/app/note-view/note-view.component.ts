import { Component, OnInit, DoCheck, OnChanges, OnDestroy } from '@angular/core';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';
import { AppService } from '../services/app.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-notes-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit, DoCheck {

  note: Note;
  notes: Array<Note> = [];
  dbNotes: Array<Note> = [];

  constructor(private notesService: NotesService, private appService: AppService,
    private auth: AuthenticationService) {
    // if(this.auth.isUserLoggerIn()) {
    //   this.getNotes();
    // }
  }

  ngOnInit() {  
    this.getNotes();
  }

  ngDoCheck() {
    this.appService.getSearchInput().subscribe(value => {
      if (value !== '') {
        this.notes = this.dbNotes.filter(note => note.noteTitle.indexOf(value.toString()) >= 0
       || note.noteContent.indexOf(value.toString()) >= 0 );
      } else {
        this.notes = this.dbNotes;
      }
    });
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      dbNotes => {
        if(dbNotes) {
          this.dbNotes = dbNotes;
          this.notes = this.dbNotes;
        }
      },
      error => console.log(error)
    );
  }

}
