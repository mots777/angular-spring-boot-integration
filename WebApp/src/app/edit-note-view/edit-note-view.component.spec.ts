import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteViewComponent } from './edit-note-view.component';

import { Note } from '../services/note';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NotesService } from '../services/notes.service';
import { NoteStub } from '../note-stub';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { RouterStub } from '../router-stub';

describe('EditNoteViewComponent', () => {
  let component: EditNoteViewComponent;
  let fixture: ComponentFixture<EditNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoteViewComponent ],
      imports: [
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: MatDialogRef, useClass: NoteStub },
        {provide: RouterService, useClass: RouterStub },
        {provide: MAT_DIALOG_DATA, useValue: { data: '' } },
        {provide: NotesService, useClass: NoteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
