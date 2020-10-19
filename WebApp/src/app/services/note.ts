import { Reminder } from '../services/reminder';
import { Category } from '../services/category';

export class Note {
  noteId?: number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreationDate: Date;
  category: Category;
  reminders?: Array<Reminder>;
  noteCreatedBy: string;

  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = '';
    this.category = new Category();
    this.noteCreationDate = null;
    this.noteCreatedBy = '';
    this.reminders = [];
  }
}
