import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './note';
import { Reminder } from './reminder';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { Console } from '@angular/core/src/console';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';
import { Category } from './category';

@Injectable()
export class NotesService {

  private noteSvcUrl = 'http://localhost:8082/api/v1/note';
  private userName: String;

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotes();
  }

  fetchNotes() {
    this.userName = this.auth.getUserName();
    if(null !== this.userName) {
      return this.http.get<Array<Note>>(`${this.noteSvcUrl}/${this.userName}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
      }).subscribe(notes => {
        this.notes = notes;
        this.notesSubject.next(this.notes);
      },
      error => { console.log('ERROR '+ error)}
    );
    } 
  }

  getNotes(): Observable<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    note.noteCreatedBy = this.auth.getUserName();
    return this.http.post<Note>(`${this.noteSvcUrl}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    }).do(newNote => {
      if(null === this.notes) {
        this.notes = new Array<Note>();
      }
      this.notes.push(newNote);
      this.notesSubject.next(this.notes);
      // console.log('note taker newNote '+JSON.stringify(newNote))
    });
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(note1 => note1.noteId === noteId);
    return Object.assign({}, note);
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.noteSvcUrl}/${this.userName}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    }).pipe(catchError(this.handleError))
    .do(updatedNote => {
      const matchNote = this.notes.find(note1 => note1.noteId === updatedNote.noteId);
      Object.assign(matchNote, updatedNote);
      this.notesSubject.next(this.notes);
    });
  }

  deleteNote(note: Note) {
    return this.http.delete(`${this.noteSvcUrl}/${this.userName}/${note.noteId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    }).do(() => {
        const index = this.findNoteIdxById(note.noteId);
        if (index > -1) {
          this.notes.splice(index, 1);
        }
        this.notesSubject.next(this.notes);
      });
  }

  findNoteIdxById(id: Number) {
    return this.notes.findIndex(currentNote => currentNote.noteId === id);
  }

  updateReminder(uiReminder: Reminder): Observable<Array<Note>> {
    if (this.notesSubject) {
      const updatedNotes = this.notes.filter(note => {
        if (note.reminders) {
          const updatedReminder = note.reminders.filter(reminder => reminder.reminderId === uiReminder.reminderId)
            .map(reminder => Object.assign(reminder, updatedReminder));
          if (updatedReminder) {
            this.editNote(note).subscribe();
            return true;
          }
        }
        return false;
      });
    }
    return this.notesSubject;
  }

  updateCategory(uiCategory: Category, noteId: number): Observable<Array<Note>> {
    if (this.notesSubject) {
      const updatedNotes = this.notes.filter(note => {
        if (note.category && note.noteId === noteId) {
          note.category = uiCategory;
          this.editNote(note).subscribe();
          return true;
        }
        return false;
      });
    }
    return this.notesSubject;
  }


  deleteReminder(id: string) {
    if (this.notesSubject) {
      const updatedNotes = this.notes.filter(note => {
        if (note.reminders) {
          const reminderIdx = note.reminders.findIndex(reminder => reminder.reminderId === id);
          if (reminderIdx > -1) {
            note.reminders.splice(reminderIdx, 1);
            this.editNote(note);
            return true;
          }
        }
        return false;
      });
    }
  }

  deleteCategory(id: string) {
    if (this.notesSubject) {
      const updatedNotes = this.notes.filter(note => {
        if (note.category) {
          if(id === note.category.id) {
            note.category = null;
            this.editNote(note);
            return true;
          }
        }
        return false;
      });
    }
  }

  private handleError(error: HttpErrorResponse): ErrorObservable {
    console.log(error);
    return new ErrorObservable(error);
  }

  clearNotes() {
    this.notes = [];
    this.notesSubject.next(this.notes);
  }
}
