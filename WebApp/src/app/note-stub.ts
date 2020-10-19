import { Observable } from 'rxjs/Observable';
import { Note } from './services/note';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

export class NoteStub {
    addNote(note: Note): Observable<Note> {
        if (note.noteTitle === 'invalid' && note.noteContent === 'invalid') {
            return Observable.throw({ message: 'your values are invalid' });
        }
        return Observable.of(note);
    }
}
