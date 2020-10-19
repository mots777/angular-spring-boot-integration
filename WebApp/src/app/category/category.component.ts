import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../services/category';
import { Note } from '../services/note';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  isEditMode: boolean;
  
  @Input()
  note: Note = <Note>{};

  @Input()
  category: Category = <Category>{};

  @Output()
  updatedCategory: EventEmitter<Category> = new EventEmitter();

  @Output()
  addCategory: EventEmitter<Category> = new EventEmitter();

  @Output()
  cancel: EventEmitter<boolean> = new EventEmitter();

  categories: Array<Category>;
  showCategoryList: boolean;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    if(this.note) {
      if(this.note.noteId === undefined) {
        this.showCategoryList = false;
      } else {
        this.showCategoryList = true;
      }
    }

    this.categoryService.getCategories().subscribe(dbCategories => {
      this.categories = dbCategories;
    });
  }

  submitCategory(categoryForm: NgForm) {
    if (categoryForm.valid) {
      const currentCategory: Category = categoryForm.value;

      if (this.isEditMode) {
        const editedCategory = this.categories.find(category => currentCategory.id === category.id);
        this.updatedCategory.emit(editedCategory);
      } else {
        this.addCategory.emit(currentCategory);
      }
    }
  }

  close() {
    this.cancel.emit(true);
  }

}
