package com.stackroute.keepnote.service;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class NoteServiceImpl implements NoteService {

	/*
	 * Autowiring should be implemented for the NoteRepository and
	 * MongoOperation. (Use Constructor-based autowiring) Please note that we
	 * should not create any object using the new keyword.
	 */
	private NoteRepository noteRepository;

	@Autowired
	public NoteServiceImpl(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}

	/*
	 * This method should be used to save a new note.
	 */
	public boolean createNote(Note note) {

		
		NoteUser noteUser = this.noteRepository.findById(note.getNoteCreatedBy()).orElse(null);
		
		if(noteUser != null) {
			int index = (noteUser.getNotes().size() == 0) ? 0 : noteUser.getNotes().size() -1 ;
			if(index > 0) {
				Note lastNote = noteUser.getNotes().get(index);
				note.setNoteId(lastNote.getNoteId() + 1);
				noteUser.getNotes().add(note);
			} else {
				note.setNoteId(index + 1);
				noteUser.getNotes().add(note);
			}
			
			noteUser = this.noteRepository.save(noteUser);
		} else {
			noteUser = new NoteUser(note.getNoteCreatedBy(), Arrays.asList(note));
			noteUser = this.noteRepository.insert(noteUser);
			
		}
		
		return noteUser != null;


	}

	/* This method should be used to delete an existing note. */

	public boolean deleteNote(String userId, int noteId) {
		NoteUser dbUser = this.noteRepository.findById(userId).orElse(null);
		
		Note dbNote = null;
		
		if(null != dbUser) {
			dbNote = this.findNote(noteId, dbUser.getNotes());
			if(null != dbNote) {
				dbUser.getNotes().remove(dbNote);
				dbUser = this.noteRepository.save(dbUser);
			}
		}
		
		return null != dbNote;
	}

	/* This method should be used to delete all notes with specific userId. */

	public boolean deleteAllNotes(String userId) {
		NoteUser dbUser = this.noteRepository.findById(userId).orElse(null);
		
		if(null != dbUser) {
			dbUser.getNotes().clear();
		}
		this.noteRepository.save(dbUser);
		
		return null != dbUser;
		
	}

	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int noteId, String userId) throws NoteNotFoundExeption {
		
		NoteUser dbUser = null;
		Note dbNote = null;
		
		dbUser = this.noteRepository.findById(userId).orElseThrow(() -> new NoteNotFoundExeption("Note Not Found Exeption"));
		dbNote = this.findNote(noteId, dbUser.getNotes());
		
		if(null == dbNote) {
			throw new NoteNotFoundExeption("Note Not Found Exeption");
		}
		
		dbNote.setCategory(note.getCategory());
		dbNote.setReminders(note.getReminders());
		dbNote.setNoteTitle(note.getNoteTitle());
		dbNote.setNoteContent(note.getNoteContent());
		dbNote.setNoteStatus(note.getNoteStatus());
		
		this.noteRepository.save(dbUser);
		
		return dbNote;

	}
	
	private Note findNote(int noteId, List<Note> notes) {
		return notes.stream().filter(note -> note.getNoteId() == noteId).findAny().orElse(null);
	}

	/*
	 * This method should be used to get a note by noteId created by specific
	 * user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {
		Note note = null;
		try {
			note = this.noteRepository.findById(userId).map(NoteUser::getNotes)
													.map(notes -> findNote(noteId, notes))
													.orElseThrow(() -> new NoteNotFoundExeption("Note Not Found"));
		} catch (NoSuchElementException e) {
			throw new NoteNotFoundExeption("Note Not Found");
		}
		
		return note;
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {

		return this.noteRepository.findById(userId).map(NoteUser::getNotes).orElse(null);
	}

}
