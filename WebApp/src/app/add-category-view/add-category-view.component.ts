import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { Note } from '../services/note';
import { Category } from '../services/category';
import { NotesService } from '../services/notes.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-add-category-view',
  templateUrl: './add-category-view.component.html',
  styleUrls: ['./add-category-view.component.css']
})
export class AddCategoryViewComponent implements OnInit {

  category: Category = new Category();
  note: Note;
  constructor(private dialogRef: MatDialogRef<AddCategoryViewComponent>,
    private routerService: RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService: CategoryService, private notesService: NotesService,
    private appService: AppService) {

  }
  ngOnInit() {
    if(this.data) {
      this.note = this.notesService.getNoteById(this.data.noteId);
    }
  }

  onAddCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(savedCategory => {
      if(this.note) {
        category.id = savedCategory.id;
        this.note.category = category;
        this.notesService.editNote(this.note).subscribe();  
      }
    });
    
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(this.data) {
      this.routerService.routeBack();
    }
    this.appService.setDisableSelectCategoryNoteTaker(false);
  }

  close(category?: Category) {
    this.dialogRef.close();
  }


}
