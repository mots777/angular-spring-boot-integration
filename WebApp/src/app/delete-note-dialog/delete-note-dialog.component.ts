import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-delete-note-dialog',
  templateUrl: './delete-note-dialog.component.html',
  styleUrls: ['./delete-note-dialog.component.css']
})
export class DeleteNoteDialogComponent implements OnInit, OnDestroy {

  note: Note;
  constructor(private dialogRef: MatDialogRef<DeleteNoteDialogComponent>,
    private routerService: RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private notesService: NotesService) {

  }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.noteId);
  }

  ngOnDestroy() {
    this.dialogRef.afterClosed().subscribe(isDelete => {
      if(isDelete) {
        this.notesService.deleteNote(this.note).subscribe();
      }
    })
    this.routerService.routeBack();
  }
}
