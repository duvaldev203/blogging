package com.blogging.springboot.services;

import com.blogging.springboot.dto.UserRequest;
import com.blogging.springboot.dto.UserResponse;
import com.blogging.springboot.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

	List<User> index();

	User show(Long id);

	User create(User user);

	User update(User user, Long id);
}
