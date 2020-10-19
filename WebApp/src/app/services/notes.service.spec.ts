import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { NotesService } from './notes.service';
import { AuthenticationStub } from '../authentication-stub';
import { AuthenticationService } from '../services/authentication.service';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;
  const note1 = { id:1, title: 'note1_title', text: 'note1_text', state: 'completed'};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesService, { provide: AuthenticationService, useClass: AuthenticationStub }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(NotesService);
    httpMock = TestBed.get(HttpTestingController);

    const request = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'GET'
    });

    request.flush([note1]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch notes from server should be making right api call and updating the notesubject', () => {
    service.fetchNotesFromServer();

    const request = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'GET'
    });

    request.flush([note1]);

    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([note1]);
    });
  });

  it('add note should be making right api call with right params and updating the notesubject', () => {
    const note2 = { id: 2, title: 'note2_title', text: 'note2_text', state: 'completed'};
    service.addNote(note2).subscribe(note => {
      expect(note).toEqual(note2);
    });

    const postRequest = httpMock.expectOne({
      url: 'http://localhost:3000/api/v1/notes',
      method: 'POST'
    });

    expect(postRequest.request.body).toEqual(note2);
    postRequest.flush(note2);

    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([note1, note2]);
    })
    
  });

  it('edit note, right api is called with right parameters, and notesubject is updated', () => {
    //
  });

  it('getNoteById, should be returning match object for the id passed', () => {
    //
  });

  afterEach(() => {
    httpMock.verify();
  });
});
