package com.stackroute.keepnote.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.repository.CategoryRepository;

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
public class CategoryServiceImpl implements CategoryService {

	/*
	 * Autowiring should be implemented for the CategoryRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	private CategoryRepository categoryRepository;
	
	@Autowired
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	/*
	 * This method should be used to save a new category.Call the corresponding
	 * method of Respository interface.
	 */
	public Category createCategory(Category category) throws CategoryNotCreatedException {

		final Category createdCategory = this.categoryRepository.insert(category);
		if(null == createdCategory) {
			throw new CategoryNotCreatedException("Category Not Created Exception");
		}
		return createdCategory;
		
	}

	/*
	 * This method should be used to delete an existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public boolean deleteCategory(String categoryId) throws CategoryDoesNoteExistsException {

		final Optional<Category> category = this.categoryRepository.findById(categoryId);
		if(null == category) {
			throw new CategoryDoesNoteExistsException("Category Does Note Exists Exception");
		}
		this.categoryRepository.deleteById(categoryId);
		return true;
	}

	/*
	 * This method should be used to update a existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public Category updateCategory(Category category, String categoryId) {

		Category updatedCategory = null;
		
		try {			
			this.categoryRepository.save(category);
			updatedCategory = getCategoryById(categoryId);
		} catch (CategoryNotFoundException e) {
			return updatedCategory;
		}
		return updatedCategory;
	}

	/*
	 * This method should be used to get a category by categoryId.Call the
	 * corresponding method of Respository interface.
	 */
	public Category getCategoryById(String categoryId) throws CategoryNotFoundException {

		Category category = null;
		try {
			final Optional<Category> categoryOpt = this.categoryRepository.findById(categoryId);
			if(null == categoryOpt) {
				throw new CategoryNotFoundException("Category Not Found Exception");
			} else {
				category = categoryOpt.get();
			}
		} catch (NoSuchElementException e) {
			throw new CategoryNotFoundException("Category Not Found Exception");
		}
		

		if(null == category) {
			throw new CategoryNotFoundException("Category Not Found Exception");
		}

		return category;
	}

	/*
	 * This method should be used to get a category by userId.Call the corresponding
	 * method of Respository interface.
	 */
	public List<Category> getAllCategoryByUserId(String userId) {

		List<Category> categories= this.categoryRepository.findAllCategoryByCategoryCreatedBy(userId);
		return categories;
	}

}
