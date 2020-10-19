import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteOpenerComponent } from './delete-note-opener.component';

describe('DeleteNoteOpenerComponent', () => {
  let component: DeleteNoteOpenerComponent;
  let fixture: ComponentFixture<DeleteNoteOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteNoteOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNoteOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
