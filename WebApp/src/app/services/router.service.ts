import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToEditNoteView(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        'noteEditOutlet': ['note', noteId, 'edit']
      }
    }]);
  }

  routeByUrl(url) {
    this.router.navigateByUrl(url);
  }

  routeToRemindersView() {
    this.router.navigate(['dashboard/view/reminderview']);
  }

  routeToCategoryView(categoryId: string) {
    this.router.navigate(['dashboard/view/categoryview/',categoryId]);
  }

  routeToNotesView() {
    this.router.navigate(['dashboard/view/noteview']);
  }

  routeToDeleteNoteDialog(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        'noteEditOutlet': ['note', noteId, 'delete']
      }
    }]);
  }

  routeToAddCategoryView(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        'noteEditOutlet': ['category', noteId, 'add']
      }
    }]);
  }

  routeToEditCategoryView(categoryId, noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        'noteEditOutlet': ['category', noteId, categoryId, 'edit']
      }
    }]);
  }

  routeToEditReminderView(reminderId, noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        'noteEditOutlet': ['reminder', noteId, reminderId, 'edit']
      }
    }]);
  }

  routeToAddReminderView(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        'noteEditOutlet': ['reminder', noteId, 'add']
      }
    }]);
  }

  routeBack() {
    this.location.back();
  }
}
