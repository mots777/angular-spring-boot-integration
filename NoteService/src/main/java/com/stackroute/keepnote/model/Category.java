package com.stackroute.keepnote.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class Category {

	/*
	 * This class should have five fields
	 * (categoryId,categoryName,categoryDescription,
	 * categoryCreatedBy,categoryCreationDate). This class should also contain the
	 * getters and setters for the fields along with the toString method. The value
	 * of categoryCreationDate should not be accepted from the user but should be
	 * always initialized with the system date.
	 */
	@Id
	private String id;

	private String categoryName;

	private String categoryDescription;

	private String categoryCreatedBy;

	private Date categoryCreationDate;


	public Category() {

	}

	public Category(String id, String categoryName, String categoryDescription, Date categoryCreationDate,
			String categoryCreatedBy) {
		this.id = id;
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
		this.categoryCreationDate = categoryCreationDate;
		this.categoryCreatedBy = categoryCreatedBy;

	}

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}

	public void setCategoryCreationDate(Date categoryCreationDate) {
		this.categoryCreationDate = categoryCreationDate;
	}

	public Date getCategoryCreationDate() {
		return categoryCreationDate;
	}

	public void setCategoryCreatedBy(String categoryCreatedBy) {
		this.categoryCreatedBy = categoryCreatedBy;
	}

	public String getCategoryCreatedBy() {
		return categoryCreatedBy;
	}

    /*public String getCategoryId() {
        return null;
    }

    public void setCategoryId(String categoryId) {
       
    }

    public String getCategoryName() {
        return null;
    }

    public void setCategoryName(String categoryName) {
        
    }

    public String getCategoryDescription() {
        return null;
    }

    public void setCategoryDescription(String categoryDescription) {
      
    }

    public String getCategoryCreatedBy() {
        return null;
    }

    public void setCategoryCreatedBy(String categoryCreatedBy) {
       
    }

    public Date getCategoryCreationDate() {
        return null;
    }

    public void setCategoryCreationDate(Date categoryCreationDate) {
      
    }*/

}
