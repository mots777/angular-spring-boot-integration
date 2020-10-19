package com.stackroute.keepnote.controller;

import java.util.Calendar;
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

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.service.CategoryService;

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
public class CategoryController {

	/*
	 * Autowiring should be implemented for the CategoryService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	private CategoryService categoryService;

	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@GetMapping
	public String swaggerUi() {
		return "redirect:/swagger-ui.html";
	}

	/*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. Please note that the careatorId has to be unique.This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP POST
	 * method".
	 */
	@ApiOperation(value="Create a Category")
	@PostMapping(value = "/category")
	public ResponseEntity<Category> createCategory(@RequestBody final Category category) {

		Category addedCategory;
		category.setCategoryCreationDate(Calendar.getInstance().getTime());
		try {
			addedCategory = this.categoryService.createCategory(category);
		} catch (CategoryNotCreatedException e) {
			return new ResponseEntity<Category>(category, HttpStatus.CONFLICT);
		}

		return new ResponseEntity<Category>(addedCategory, HttpStatus.CREATED);

	}
	
	/*
	 * Define a handler method which will delete a category from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
	 * not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid categoryId without {}
	 */
	@DeleteMapping(value = "/category/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable("id") String categoryId, final HttpSession session) {

		try {
			this.categoryService.deleteCategory(categoryId);
		} catch (CategoryDoesNoteExistsException e) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	
	/*
	 * Define a handler method which will update a specific category by reading the
	 * Serialized object from request body and save the updated category details in
	 * database. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the category updated
	 * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
	 * is not found. 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP PUT
	 * method.
	 */
	@PutMapping(value = "/category/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable("id") String categoryId, @RequestBody Category category,
			final HttpSession session) {

//		if (!isUserLoggedIn(session)) {
//			return new ResponseEntity<Category>(HttpStatus.UNAUTHORIZED);
//		}
		try {
			this.categoryService.getCategoryById(categoryId);
		} catch (CategoryNotFoundException e1) {
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}
		
		Category categoryUpdt = null;
		categoryUpdt = this.categoryService.updateCategory(category, categoryId);
		if (null == categoryUpdt) {
			return new ResponseEntity<Category>(HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<Category>(categoryUpdt, HttpStatus.OK);

	}
	
	/*
	 * Define a handler method which will get us the category by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category found successfully. 
	 * 
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP GET method
	 */
	@GetMapping(value = "/category/{userId}")
	public ResponseEntity<List<Category>> getCategoryByUser(@PathVariable("userId") final String userId) {

		final List<Category> userCategoryLst = this.categoryService.getAllCategoryByUserId(userId);

		return new ResponseEntity<List<Category>>(userCategoryLst, HttpStatus.OK);

	}
	
	/*
	 * This handler returns the category by the category id
	 * 
	 */
/*	
	@GetMapping(value = "/category/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable("id") final String categoryId) {

		Category category = null;
		try {
			category = this.categoryService.getCategoryById(categoryId);
		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Category>(category, HttpStatus.OK);

	}*/


}
