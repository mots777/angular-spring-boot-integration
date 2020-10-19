package com.stackroute.keepnote.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.service.NoteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@RequestMapping(value="/api/v1")
@Api
//@CrossOrigin("http://localhost:4200")
@CrossOrigin("*")
public class NoteController {

	/*
	 * Autowiring should be implemented for the NoteService. (Use Constructor-based
	 * autowiring) Please note that we should not create any object using the new
	 * keyword
	 */
	private NoteService noteService;

	@Autowired
	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}
	
	@GetMapping
	public String swaggerUi() {
		return "redirect:/swagger-ui.html";
	}

	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in the
	 * database.This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 201(CREATED) - If the note created successfully. 
	 * 2. 409(CONFLICT) - If the noteId conflicts with any existing user.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP POST method
	 */
	@ApiOperation(value="Create a Note")
	@PostMapping(value = "/note")
	public ResponseEntity<Note> createNote(@RequestBody Note note, final HttpSession session) {

		boolean status = true;
		status = this.noteService.createNote(note);
		if (!status) {
			return new ResponseEntity<Note>(note, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<Note>(note, HttpStatus.CREATED);

	}

	/*
	 * Define a handler method which will delete a note from a database.
	 * This handler method should return any one of the status messages basis 
	 * on different situations: 
	 * 1. 200(OK) - If the note deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid noteId without {}
	 */
/*	@DeleteMapping(value = "/note/{id}")
	public ResponseEntity<Void> deleteNote(@PathVariable("id") int noteId, final HttpSession session) {

//		if (!isUserLoggedIn(session)) {
//			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
//		}
		final String userId = (String) session.getAttribute("loggedInUserId");
		final boolean status = this.noteService.deleteNote(userId, noteId);
		if(status){
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		
	}*/
	
	/*
	 * This handler deletes all notes by a user 
	 */
	@DeleteMapping(value = "/note/{userId}")
	public ResponseEntity<Void> deleteAllNotesByUser(@PathVariable("userId") String userId, final HttpSession session) {

		boolean status = false;
		try {
			status = this.noteService.deleteAllNotes(userId);
		} catch (NoteNotFoundExeption e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		if(status){
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	/*
	 * 
	 * 
	 */
	@DeleteMapping(value = "/note/{userId}/{noteId}")
	public ResponseEntity<Void> deleteNoteByUser(@PathVariable("userId") final String userId,
			@PathVariable("noteId") final int noteId) {

		boolean status = false;
		status = this.noteService.deleteNote(userId, noteId);
		if(status){
			return new ResponseEntity<Void>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		
	}

	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in a
	 * database. 
	 * This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the note updated successfully.
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP PUT method.
	 */
	@PutMapping(value = "/note/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable("id") int noteId, @RequestBody Note note,
			final HttpSession session) {

		final String userId = (String) session.getAttribute("loggedInUserId");
		try {
			this.noteService.getNoteByNoteId(userId, noteId);
		} catch (NoteNotFoundExeption e1) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		
		Note noteUpdt = null;
		try {
			noteUpdt = this.noteService.updateNote(note, noteId, userId);
		} catch (NoteNotFoundExeption e) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}

		if (null == noteUpdt) {
			return new ResponseEntity<Note>(HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<Note>(noteUpdt, HttpStatus.OK);

	}
	
	/*
	 * 
	 * This handler updates particular note for a user
	 */
	@PutMapping(value = "/note/{userId}/{id}")
	public ResponseEntity<Note> updateNoteByUser(@PathVariable("userId") String userId,
			@PathVariable("id") int noteId, @RequestBody Note note) throws NoteNotFoundExeption {

		Note updatedNote = this.noteService.updateNote(note, noteId, userId);
		if(null == updatedNote) {
			throw new NoteNotFoundExeption("Note Not Found");
		}
		
		return ResponseEntity.ok(updatedNote);

	}
	
	/*
	 * Define a handler method which will get us the all notes by a userId.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the note found successfully. 
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP GET method
	 */
/*	@GetMapping(value = "/note")
	public ResponseEntity<List<Note>> getNotesByUser(final HttpSession session) {
//		if (!isUserLoggedIn(session)) {
//			return new ResponseEntity<List<Category>>(HttpStatus.UNAUTHORIZED);
//		}
		final String userId = (String) session.getAttribute("loggedInUserId");
		final List<Note> userNotes = this.noteService.getAllNoteByUserId(userId);

		return new ResponseEntity<List<Note>>(userNotes, HttpStatus.OK);

	}*/
	
	/*
	 * This handler returns all the notes by a user
	 * 
	 */
	@GetMapping(value = "/note/{userId}")
	public ResponseEntity<List<Note>> getAllNotesByUser(@PathVariable("userId") final String userId) {

		final List<Note> userNotes = this.noteService.getAllNoteByUserId(userId);

		return new ResponseEntity<List<Note>>(userNotes, HttpStatus.OK);

	}
	
	/*
	 * Define a handler method which will show details of a specific note created by specific 
	 * user. This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the note found successfully. 
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}" using HTTP GET method
	 * where "id" should be replaced by a valid reminderId without {}
	 * 
	 */
	@GetMapping(value = "/note/{userId}/{noteId}")
	public ResponseEntity<Note> getNoteByUser(@PathVariable("userId") final String userId, 
			@PathVariable("noteId") final int noteId, final HttpSession session) {
//		if (!isUserLoggedIn(session)) {
//			return new ResponseEntity<List<Category>>(HttpStatus.UNAUTHORIZED);
//		}
		Note note = null;
		try {
			note = this.noteService.getNoteByNoteId(userId, noteId);
		} catch (NoteNotFoundExeption e) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Note>(note, HttpStatus.OK);

	}


}
