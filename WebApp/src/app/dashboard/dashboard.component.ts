import { Component, OnInit } from '@angular/core';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  note: Note = new Note();
  notes: Array<Note> = [];

  toggleSidenav: Boolean;

  constructor(private notesService: NotesService, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getSideNavStatus().subscribe(value => {
      this.toggleSidenav = value;
    });

    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      error => console.log(error)
    );
  }
}
