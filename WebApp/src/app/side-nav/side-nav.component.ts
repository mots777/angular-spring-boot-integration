import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AppService } from '../services/app.service';
import { Category } from '../services/category';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material';
import { AddCategoryViewComponent } from '../add-category-view/add-category-view.component';
import { EditCategoryViewComponent } from '../edit-category-view/edit-category-view.component';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  @Input()
  toggle: boolean;

  categories: Array<Category>;

  constructor(public dialog: MatDialog, private router: RouterService, private appService: AppService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    }, err => {
      console.log(err.message);
    });
  }

  onShowCategoryNotes(categoryId: string) {
    this.appService.setIsRemindersView(false);
    this.appService.setIsCategoryView(true);
    this.router.routeToCategoryView(categoryId);
  }

  onShowReminders() {
    this.appService.setIsCategoryView(false);
    this.appService.setIsRemindersView(true);
    this.router.routeToRemindersView();
  }

  onShowNotes() {
    this.appService.setIsRemindersView(false);
    this.appService.setIsCategoryView(false);
    this.appService.setSearchInput('');
    this.router.routeToNotesView();
  }

  onCreateCategory(): void {
    this.dialog.open(AddCategoryViewComponent, {
      width: '350px'
    });
  }

  onDeleteCategory(category: Category): void {
    this.dialog.open(DeleteCategoryDialogComponent, {
      width: '350px',
      data: { categoryId: category.id }
    });
  }

  onEditCategory(category: Category): void {
    this.dialog.open(EditCategoryViewComponent, {
      width: '350px',
      data: { categoryId: category.id }
    });
  }

}
