import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditCategoryViewComponent } from '../edit-category-view/edit-category-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category-opener',
  templateUrl: './edit-category-opener.component.html',
  styleUrls: ['./edit-category-opener.component.css']
})
export class EditCategoryOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    const noteId = +activatedRoute.snapshot.paramMap.get('noteId');
    const categoryId = activatedRoute.snapshot.paramMap.get('categoryId');

    this.dialog.open(EditCategoryViewComponent, {
      data: {
        noteId: noteId,
        categoryId: categoryId
      }
    });
   }

  ngOnInit() {
  }

}
