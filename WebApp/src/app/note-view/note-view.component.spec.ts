import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteViewComponent } from './note-view.component';

import { Note } from '../services/note';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteComponent } from '../note/note.component';
import { MatCardModule } from '@angular/material/card';
import { NotesService } from '../services/notes.service';
import { NoteStub } from '../note-stub';

describe('NoteViewComponent', () => {
  let component: NoteViewComponent;
  let fixture: ComponentFixture<NoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteViewComponent, NoteComponent ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      providers: [
        {provide: NotesService, useClass: NoteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
