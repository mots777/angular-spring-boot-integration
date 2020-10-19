import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const noteId = +activatedRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId: noteId
      }
    });
   }

  ngOnInit() {
  }

}
