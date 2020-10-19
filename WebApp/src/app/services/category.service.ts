import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Note } from './note';
import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { NotesService } from './notes.service';

@Injectable()
export class CategoryService {

  private categorySvcUrl = 'http://localhost:8083/api/v1/category';
  
  categories: Array<Category> = [];
  categoriesSubject: BehaviorSubject<Array<Category>>;
  constructor(private http: HttpClient, private auth: AuthenticationService,
    private noteService: NotesService) {
    // this.categoriesSubject = new BehaviorSubject(this.categories);
   }

   getCategories(): Observable<Array<Category>> {
    if(!this.categoriesSubject) {
      this.categoriesSubject = new BehaviorSubject(this.categories);
      this.http.get<Array<Category>>(`${this.categorySvcUrl}/${this.auth.getUserName()}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
      })
      .subscribe(data => {
        this.categories = data;
        this.categoriesSubject.next(this.categories);
      }, error => {
        this.categoriesSubject.error(error);
      });
    }
    return this.categoriesSubject;
  }

  addCategory(category: Category): Observable<Category> {
    const newCategory = Object.assign({}, category);
    newCategory.categoryCreatedBy = this.auth.getUserName();

    if(!this.categoriesSubject) {
      this.categoriesSubject = new BehaviorSubject(this.categories);
      // this.categories.push(newCategory);
      // this.categoriesSubject.next(this.categories);
    }
    this.categories.push(newCategory);
    this.categoriesSubject.next(this.categories);
    return this.http.post<Category>(`${this.categorySvcUrl}`, newCategory, {
     headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
   })
    .do(savedCategory => {
      newCategory.id = savedCategory.id;
    })
    .pipe(catchError(resp => {
      if(this.categoriesSubject) {
        const index: number = this.categories.findIndex(currentCategory => currentCategory === newCategory);
       this.categories.splice(index, 1);
       this.categoriesSubject.next(this.categories);
      }
      return this.handleError(resp);
    }));
  }

  updateCategory(category: Category, noteId: number): Observable<Category> {
    console.log('categoridi '+category)
    return this.http.put<Category>(`${this.categorySvcUrl}/${category.id}`, category, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    })
    .do(updatedCategory => {
      if(this.categoriesSubject) {
        const index = this.findCategoryIndexById(updatedCategory.id);
        if(index > -1) {
          this.categories[index] = updatedCategory;
        }
        this.categoriesSubject.next(this.categories);
      }
      this.noteService.updateCategory(category, noteId).subscribe();
    });
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.categorySvcUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    })
    .do(() => {
        const index = this.findCategoryIndexById(id);
        if(index > -1) {
          this.categories.splice(index, 1);
        this.categoriesSubject.next(this.categories);
      }
      this.noteService.deleteCategory(id);
    });
  }

  findCategoryIndexById(id: string) {
    return this.categories.findIndex(currentCategory => currentCategory.id === id);
  }

    private handleError(error: HttpErrorResponse): ErrorObservable {
      return new ErrorObservable(error);
    }

}
