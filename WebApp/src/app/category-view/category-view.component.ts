import { Component, OnInit, DoCheck } from '@angular/core';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';
import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit, DoCheck {

  note: Note;
  categoryNotes: Array<Note> = [];
  categoryId: string;
  notes: Array<Note> = [];
  constructor(private notesService: NotesService, private appService: AppService,
      private activatedRoute: ActivatedRoute) {
        this.categoryId = activatedRoute.snapshot.paramMap.get('categoryId');
   }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.findNoteswithCategory(data),
      error => console.log(error)
    );
  }

  ngDoCheck() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    this.findNoteswithCategory(this.notes);
  }

  findNoteswithCategory(dbNotes) {
    this.notes = dbNotes;
    this.categoryNotes = this.notes.filter(note => {
      if(note.category !== null) {
        if(note.category.id === this.categoryId){
          return true;
        }
      }
    });
  }

}
