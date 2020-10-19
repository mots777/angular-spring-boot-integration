import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../services/category';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css']
})
export class DeleteCategoryDialogComponent implements OnInit {

  category: Category;
  constructor(private dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    private routerService: RouterService, @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(dbCategories => {
      const category = dbCategories.filter(category => {
        if (category.id === this.data.categoryId) {
          return true;
        }
      }).map(category => {
        this.category = category;
      });
    });
  }

  ngOnDestroy() {
    this.dialogRef.afterClosed().subscribe(isDelete => {
      if(isDelete) {
        this.categoryService.deleteCategory(this.category.id).subscribe();
      }
    });

    // this.routerService.routeBack();
  }

}
