import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AppService } from '../services/app.service';
import { Note } from '../services/note';
import { NotesService } from '../services/notes.service';
import {FormControl} from '@angular/forms';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  isNoteView: boolean;
  isReminderView: Boolean;
  isCategoryView: Boolean;
  toggleStatus: boolean;

  @Input()
  isloggedIn: boolean;

  @Output()
  logout: EventEmitter<Boolean> = new EventEmitter();

  @Output()
  toggleSideNav: EventEmitter<Boolean> = new EventEmitter();

  notes: Array<Note> = [];

  myControl = new FormControl();
  searchText: String = '';

  constructor(private appService: AppService, private notesService: NotesService,
    private router: RouterService) { 

  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      error => console.log(error)
    );
  }

  ngOnChanges() {
    this.appService.getIsRemindersView().subscribe(status => {
      this.isReminderView = status;
    });

    this.appService.getIsCategoryView().subscribe(status => {
      this.isCategoryView = status;
    });
  }

  onSearch() {
    this.appService.setSearchInput(this.myControl.value);
    this.router.routeToNotesView();
  }

  clear() {
    this.searchText = '';
    this.appService.setSearchInput('');
  }

  switchToNoteView() {
    this.isNoteView = !this.isNoteView;
  }

  fireToggleSideNav() {
    this.toggleStatus = !this.toggleStatus;
    this.toggleSideNav.emit(this.toggleStatus);
  }

  onlogout() {
    this.notesService.clearNotes();
    this.logout.emit(true);
  }

}
