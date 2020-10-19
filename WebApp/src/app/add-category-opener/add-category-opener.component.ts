import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCategoryViewComponent } from '../add-category-view/add-category-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-category-opener',
  templateUrl: './add-category-opener.component.html',
  styleUrls: ['./add-category-opener.component.css']
})
export class AddCategoryOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const noteId = +activatedRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(AddCategoryViewComponent, {
      data: {
        noteId: noteId
      }
    });
   }

  ngOnInit() {
  }

}
