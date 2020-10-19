package com.stackroute.keepnote.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*
 * Please note that this class is annotated with @Document annotation
 * @Document identifies a domain object to be persisted to MongoDB.
 *  */
@Document
public class User {

	/*
	 * This class should have five fields (userId,userName,
	 * userPassword,userMobile,userAddedDate). Out of these five fields, the field
	 * userId should be annotated with @Id (This annotation explicitly specifies the document
	 * identifier). This class should also contain the getters and setters for the
	 * fields, along with the no-arg , parameterized constructor and toString
	 * method.The value of userAddedDate should not be accepted from the user but
	 * should be always initialized with the system date.
	 */
	
	@Id
	private String userId;

	private String userName;

	private String userPassword;

	private String userMobile;

	private Date userAddedDate;
	
	public User() {

	}

	public User(String userId, String userName, String userPassword, String userMobile, Date userAddedDate) {
		this.userId = userId;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userMobile = userMobile;
		this.userAddedDate = userAddedDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserMobile() {
		return userMobile;
	}

	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}

	public Date getUserAddedDate() {
		return userAddedDate;
	}

	public void setUserAddedDate(Date userAddedDate) {
		this.userAddedDate = userAddedDate;
	}
	
	/*public User() {
	}
	public User(String string, String string1, String string2, String string3, Date date) {
	}
	public String getUserId() {
		return null;
	}
	public void setUserId(String string) {
	}
	public void setUserName(String string) {
	}
	public String getUserPassword() {
		return null;
	}
	public void setUserPassword(String string) {
	}
	public String getUserMobile() {
		return null;
	}
	public void setUserMobile(String string) {
	}
	public void setUserAddedDate(Date date) {
	}*/

	 
}
