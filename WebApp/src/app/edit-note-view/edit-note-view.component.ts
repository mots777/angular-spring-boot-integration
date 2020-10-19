import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { RouterService } from '../services/router.service';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {

  note: Note;
  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    private routerService: RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private notesService: NotesService) {

  }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.noteId);
  }

  saveEditedNote() {
    this.notesService.editNote(this.note).subscribe();
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.routerService.routeBack();
  }

}
