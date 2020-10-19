import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddReminderViewComponent } from '../add-reminder-view/add-reminder-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-reminder-opener',
  templateUrl: './add-reminder-opener.component.html',
  styleUrls: ['./add-reminder-opener.component.css']
})
export class AddReminderOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const noteId = +activatedRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(AddReminderViewComponent, {
      data: {
        noteId: noteId
      }
    });
   }
  ngOnInit() {
  }

}
