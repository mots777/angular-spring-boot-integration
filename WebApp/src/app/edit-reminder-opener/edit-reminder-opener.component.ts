import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditReminderViewComponent } from '../edit-reminder-view/edit-reminder-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const noteId = +activatedRoute.snapshot.paramMap.get('noteId');
    const reminderId = activatedRoute.snapshot.paramMap.get('reminderId');

    this.dialog.open(EditReminderViewComponent, {
      data: {
        noteId: noteId,
        reminderId: reminderId
      }
    });
   }

  ngOnInit() {
  }

}
