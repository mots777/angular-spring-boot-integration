import { Component, OnInit } from '@angular/core';
import { Note } from '../services/note';
import { Category } from '../services/category';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material';
import { AddCategoryViewComponent } from '../add-category-view/add-category-view.component';
import { AddReminderViewComponent } from '../add-reminder-view/add-reminder-view.component';
import { AppService } from '../services/app.service';
import { Reminder } from '../services/reminder';
import { ReminderService } from '../services/reminder.service';
import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  note: Note = new Note();
  categories: Array<Category>;
  reminders: Array<Reminder>;
  disableCategorySelect: Boolean = false;
  disableReminderSelect: Boolean = false;
  constructor(private notesService: NotesService, public dialog: MatDialog,
    private categoryService: CategoryService, private appService: AppService,
    private reminderService: ReminderService, private router: RouterService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(dbCategories => {
      this.categories = dbCategories;
    });
    this.reminderService.getReminders().subscribe(dbReminders => {
      this.reminders = dbReminders;
    });
  }

  takeNote() {
    if(this.note.category !== null) {
      if(this.note.category.categoryName === ''){
        this.note.category = null;
      }
    }

    this.notesService.addNote(this.note).subscribe(
      data => { },
      error => { console.log(' TAKE NOTE new note ERROR!! : '+ error) }
    );
    this.note = new Note();
  }

  onCreateCategory(): void {
    this.disableCategorySelect = true;
    this.dialog.open(AddCategoryViewComponent, {
      width: '350px'
    });
    this.appService.getDisableSelectCategoryNoteTaker().subscribe(status => {
      this.disableCategorySelect = status;
    })
  }

  onCreateReminder(): void {
    this.disableReminderSelect = true;
    this.dialog.open(AddReminderViewComponent, {
      width: '350px'
    });
    this.appService.getDisableSelectReminderNoteTaker().subscribe(status => {
      this.disableReminderSelect = status;
    })
  }

}