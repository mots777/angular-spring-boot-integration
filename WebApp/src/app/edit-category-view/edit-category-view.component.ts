import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { Note } from '../services/note';
import { Category } from '../services/category';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit, OnDestroy {

  note: Note;
  category: Category;

  constructor(private dialogRef:MatDialogRef<EditCategoryViewComponent>,
    private routerService:RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService:CategoryService, private notesService: NotesService) { 
     
    }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.noteId);
    if(this.note && this.data.noteId !== undefined) {
      this.category = this.note.category;
    }
    if(this.category === undefined && this.data.categoryId) {
      this.categoryService.getCategories().subscribe(dbCategories => {
        const category = dbCategories.filter(category => {
          if (category.id === this.data.categoryId) {
            return true;
          }
        }).map(category => {
          // Object.assign(this.category, category);
          this.category = category;
        });
      });
    }
  }

  onUpdateCategory(category: Category): void {
    this.categoryService.updateCategory(category, this.note.noteId).subscribe();
    
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(this.data.noteId) {
      this.routerService.routeBack();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
