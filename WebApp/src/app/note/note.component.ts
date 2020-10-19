import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../services/note';
import { RouterService } from '../services/router.service';
import { Reminder } from '../services/reminder';
import { ReminderService } from '../services/reminder.service';
import { NotesService } from '../services/notes.service';
import { Category } from '../services/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  removable: boolean = true;
  selectable: boolean = true;

  @Input()
  note: Note;

  hoverIndex: boolean;
  constructor(private routerService: RouterService, private reminderService: ReminderService, 
    private noteService: NotesService, private categoryService: CategoryService) {

  }

  ngOnInit() {
  }

  openEditNoteView() {
    console.log('click edit note '+this.note.noteId)
    this.routerService.routeToEditNoteView(this.note.noteId);
  }

  openDeleteNoteDialog() {
    this.routerService.routeToDeleteNoteDialog(this.note.noteId);
  }

  openAddCategoryView() {
    this.routerService.routeToAddCategoryView(this.note.noteId);
  }

  openEditCategoryView(categoryId: string) {
    this.routerService.routeToEditCategoryView(categoryId, this.note.noteId);
  }

  openEditReminderView(reminderId: string) {
    this.routerService.routeToEditReminderView(reminderId, this.note.noteId);
  }

  openAddReminderView() {
    this.routerService.routeToAddReminderView(this.note.noteId);
  }

  onDeleteReminder(reminder: Reminder) {
    this.reminderService.deleteReminder(reminder.reminderId).subscribe();

  }

  onDeleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe();

  }

  enter() {
    this.hoverIndex = true;
  }

  leave() {
    this.hoverIndex = false;
  }

}
