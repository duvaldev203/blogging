package com.blogging.springboot.services;

import com.blogging.springboot.exceptions.NotFoundException;
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
						() -> new NotFoundException("utilisateur", id));
	}

	@Override
	public User create(User user) {
		return userRepo.save(user);
	}

	@Override
	public User update(User user, Long id) {
		User old = userRepo.findById(id).orElseThrow(
						() -> new NotFoundException("utilisateur", id));
		user.setId(id);
		user.setProfile(old.getProfile());
		return userRepo.save(user);
	}

}
