import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationStub } from '../authentication-stub';
import { RouterService } from '../services/router.service';
import { RouterStub } from '../router-stub';
import { NotesService } from '../services/notes.service';
import { NoteStub } from '../note-stub';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: AuthenticationService, useClass: AuthenticationStub },
        {provide: RouterService, useClass: RouterStub },
        {provide: NotesService, useClass: NoteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
