import { Component, OnInit } from '@angular/core';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  note: Note;
  notes: Array<Note> = [];

  notStartedNotes: Array<Note> = [];
  startedNotes: Array<Note> = [];
  completedNotes: Array<Note> = [];
  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data;
        this.notStartedNotes = this.notes.filter((note) => {
          return note.noteStatus === 'not-started';
        });
        this.startedNotes = this.notes.filter((note) => {
          return note.noteStatus === 'started';
        });
        this.completedNotes = this.notes.filter((note) => {
          return note.noteStatus === 'completed';
        });
      },
      error => console.log(error)
    );
    
  }

}
