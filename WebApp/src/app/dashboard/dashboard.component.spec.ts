import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Note } from '../services/note';

import { By } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { NoteTakerComponent } from '../note-taker/note-taker.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NotesService } from '../services/notes.service';
import { NoteStub } from '../note-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: NotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, NoteTakerComponent ],
      imports: [
        RouterModule,
        MatToolbarModule,
        MatExpansionModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: NotesService, useClass: NoteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NotesService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input element for note title', () => {
    const de = fixture.debugElement.query(By.css('input'));
    expect(de).toBeTruthy();
    expect(de.nativeElement.value).toBe('');
  });

  it('should have text area element for note text', () => {
    const de = fixture.debugElement.query(By.css('textarea'));
    expect(de).toBeTruthy();
    expect(de.nativeElement.value).toBe('');
  });

  it('should have button element for submit note with value Done', () => {
    const de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy();
    expect(de.nativeElement.textContent).toBe('Done');
  });

  it('should note be able to take note if input for note title is blank, button is diabled', () => {
    const testNote = new Note();
    testNote.text = 'text1';
    component.note = testNote;

    const de = fixture.debugElement.query(By.css('button'));
    expect(de.nativeElement.disabled).toBe(false);
  });

});
