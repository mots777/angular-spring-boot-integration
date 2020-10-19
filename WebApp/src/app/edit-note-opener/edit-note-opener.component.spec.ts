import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Note } from '../services/note';
import { EditNoteOpenerComponent } from './edit-note-opener.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { NoteComponent } from '../note/note.component';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { NgModule } from '@angular/core';
import { ActivatedRouteStub } from '../activated-route-stub';

describe('EditNoteOpenerComponent', () => {
  let component: EditNoteOpenerComponent;
  let fixture: ComponentFixture<EditNoteOpenerComponent>;
  let activatedRouteStub = new ActivatedRouteStub({noteId: 1});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EditNoteOpenerComponent, 
        EditNoteViewComponent,
        NoteComponent
       ],
      imports: [
        // RouterModule,
        MatToolbarModule,
        MatExpansionModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        // RouterTestingModule,
        MatDialogModule,
        MatCardModule,
        // MatDialogRef,
        BrowserAnimationsModule,
        // MatDialog,
        // NgModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub }
        // {provide: ActivatedRoute, useValue: {
        //   data: { subscribe: 1 },
        //   snapshot: {url: ['note/:noteId/edit']}
        // } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteOpenerComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
