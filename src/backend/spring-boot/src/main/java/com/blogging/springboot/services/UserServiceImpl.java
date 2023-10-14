package com.blogging.springboot.services;

import com.blogging.springboot.models.User;
import com.blogging.springboot.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements  UserService {

	private final UserRepository userRepo;

	public UserServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	public List<User> index() {
		return userRepo.findAll();
	}

	@Override
	public User show(Long id) {
		return userRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException("Not Found !!!"));
	}

	@Override
	public User create(User user) {
		return userRepo.save(user);
	}

	@Override
	public User update(User user, Long id) {
		userRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("Le user d'id %d n'a pas ete trouve", id)));
		user.setId(id);
		return userRepo.save(user);
	}

}
