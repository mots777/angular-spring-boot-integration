package com.stackroute.keepnote.model;

import java.util.Date;
import java.util.List;

//import javax.persistence.ManyToOne;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Note {
	
	/*
	 * This class should have eight fields
	 * (noteId,noteTitle,noteContent,noteStatus,createdAt,
	 * category,reminder,createdBy). This class should also contain the
	 * getters and setters for the fields along with the no-arg , parameterized
	 * constructor and toString method. The value of createdAt should not be
	 * accepted from the user but should be always initialized with the system date.
	 * 
	 */
	@Id
	private int noteId;
	
	private String noteTitle;
	
	private String noteContent;
	
	private String noteStatus;
	
	private Date noteCreationDate;
//	@DBRef
	private Category category;
//	@DBRef
	private Reminder reminder;
	
	private String noteCreatedBy;
	
	private List<Reminder> reminders;

	public Note() {

	}

	public Note(int noteId, String noteTitle, String noteContent, String noteStatus, Date noteCreationDate, Category category, Reminder reminder,
			String noteCreatedBy) {
		this.noteId = noteId;
		this.noteTitle = noteTitle;
		this.noteContent = noteContent;
		this.noteStatus = noteStatus;
		this.noteCreationDate = noteCreationDate;
		this.noteCreatedBy = noteCreatedBy;
		this.reminder = reminder;
	}

	public int getNoteId() {
		return noteId;
	}

	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}

	public String getNoteTitle() {
		return noteTitle;
	}

	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}

	public String getNoteContent() {
		return noteContent;
	}

	public void setNoteContent(String noteContent) {
		this.noteContent = noteContent;
	}

	public String getNoteStatus() {
		return noteStatus;
	}

	public void setNoteStatus(String noteStatus) {
		this.noteStatus = noteStatus;
	}

	/*public Date getNoteCreatedAt() {
		return noteCreatedAt;
	}

	public void setNoteCreatedAt(Date noteCreatedAt) {
		this.noteCreatedAt = noteCreatedAt;
	}*/

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Reminder getReminder() {
		return reminder;
	}

	public void setReminder(Reminder reminder) {
		this.reminder = reminder;
	}

	public Date getNoteCreationDate() {
        return noteCreationDate;
    }

    public void setNoteCreationDate(Date noteCreationDate) {
        this.noteCreationDate = noteCreationDate;
    }

	public String getNoteCreatedBy() {
		return noteCreatedBy;
	}

	public void setNoteCreatedBy(String noteCreatedBy) {
		this.noteCreatedBy = noteCreatedBy;
	}

	public List<Reminder> getReminders() {
		return reminders;
	}

	public void setReminders(List<Reminder> reminders) {
		this.reminders = reminders;
	}

	/*public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}*/
	


	    // getters & setters
/*
	    public int getNoteId() {
	        return 0;
	    }

	    public void setNoteId(int noteId) {
	     
	    }

	    public String getNoteTitle() {
	        return null;
	    }

	    public void setNoteTitle(String noteTitle) {
	       
	    }

	    public String getNoteContent() {
	        return null;
	    }

	    public void setNoteContent(String noteContent) {
	       
	    }

	    public String getNoteStatus() {
	        return null;
	    }

	    public void setNoteStatus(String noteStatus) {
	       
	    }

	    public Date getNoteCreationDate() {
	        return null;
	    }

	    public void setNoteCreationDate(Date noteCreationDate) {
	        
	    }

	    public String getNoteCreatedBy() {
	        return null;
	    }

	    public void setNoteCreatedBy(String noteCreatedBy) {
	        
	    }

	    public Category getCategory() {
	        return null;
	    }

	    public void setCategory(Category category) {
	       
	    }

	    public List<Reminder> getReminders() {
	        return null;
	    }

	    public void setReminders(List<Reminder> reminders) {
	    
	    }*/
	
}
