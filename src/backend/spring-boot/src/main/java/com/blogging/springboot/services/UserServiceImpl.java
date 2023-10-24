package com.blogging.springboot.services;

import com.blogging.springboot.dto.PasswordRequest;
import com.blogging.springboot.exceptions.BADException;
import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.User;
import com.blogging.springboot.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements  UserService {

	private final UserRepository userRepo;

	private final PasswordEncoder passwordEncoder;
	public UserServiceImpl(UserRepository userRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
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
		user.setPassword(passwordEncoder.encode(user.getPassword()));
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

	@Override
	public User modifyPassword(Long id, PasswordRequest request) {
		User oldUser = userRepo.findById(id)
						.orElseThrow(() -> new NotFoundException("User", id));
		if (passwordEncoder.matches(request.getOldPassword(), oldUser.getPassword())) {
			savePassword(oldUser, request.getNewPassword());
			return userRepo.save(oldUser);
		} else {
			throw new BADException("Votre ancien mot de passe ne correspond pas au mot de passe que vous avez entre");
		}
	}
	public  void savePassword(User user, String password){
		user.setPassword(passwordEncoder.encode(password));
	}
}
