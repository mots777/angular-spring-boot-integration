import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteNoteDialogComponent } from '../delete-note-dialog/delete-note-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-note-opener',
  templateUrl: './delete-note-opener.component.html',
  styleUrls: ['./delete-note-opener.component.css']
})
export class DeleteNoteOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const noteId = +activatedRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(DeleteNoteDialogComponent, {
      data: {
        noteId: noteId
      }
    });
   }

  ngOnInit() {
  }

}
