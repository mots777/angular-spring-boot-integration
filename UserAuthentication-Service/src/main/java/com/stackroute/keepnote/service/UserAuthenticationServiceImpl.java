package com.stackroute.keepnote.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserAutheticationRepository;

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
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

	/*
	 * Autowiring should be implemented for the UserAuthenticationRepository.
	 * (Use Constructor-based autowiring) Please note that we should not create
	 * any object using the new keyword.
	 */

	private UserAutheticationRepository userAuthenticationRepository;

	@Autowired
	public UserAuthenticationServiceImpl(UserAutheticationRepository userAuthenticationRepository) {
		this.userAuthenticationRepository = userAuthenticationRepository;
	}

	/*
	 * This method should be used to validate a user using userId and password.
	 * Call the corresponding method of Respository interface.
	 * 
	 */
	@Override
	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
		final User user = this.userAuthenticationRepository.findByUserIdAndUserPassword(userId, password);
		if (null == user) {
			throw new UserNotFoundException("User Not Found ");
		}
		return user;
	}

	/*
	 * This method should be used to save a new user.Call the corresponding
	 * method of Respository interface.
	 */

	@Override
	public boolean saveUser(User user) throws UserAlreadyExistsException {
		boolean status = false;
		final Optional<User> userChkOpt = this.userAuthenticationRepository.findById(user.getUserId());
		if (null != userChkOpt) {
			if(userChkOpt.isPresent()) {
				User userChk = userChkOpt.get(); 
				if(null != userChk) {
					throw new UserAlreadyExistsException("User Already Exists Exception");
				}
			}
			
		}
		final User addedUser = this.userAuthenticationRepository.save(user);
		if (null != addedUser) {
			status = true;
		}

		return status;
	}
	
	/*
	 * 
	 */
	/*public boolean validate(String username, String password) {
		findByUserIdAndPassword(username, password);
		if (findByUserIdAndPassword(username, password) != null) {
			return true;
		} else {
			return false;
		}
	}*/
}
