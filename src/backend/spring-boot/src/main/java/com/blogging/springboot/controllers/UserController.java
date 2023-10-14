package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.UserResponse;
import com.blogging.springboot.models.User;
import com.blogging.springboot.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

	private final ModelMapper modelMapper;

	private final UserService userService;

	@Autowired
	public UserController (ModelMapper modelMapper, UserService userService){
		this.modelMapper = modelMapper;
		this.userService = userService;
	}

	@GetMapping
	ResponseEntity<List<UserResponse>> index(){
		List<UserResponse> users = userService.index().stream().map(
						el -> modelMapper.map(el, UserResponse.class)).toList();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<UserResponse> show(@PathVariable Long id){
		UserResponse user = modelMapper.map(userService.show(id), UserResponse.class);
		return new ResponseEntity<>(user, HttpStatus.FOUND);
	}

	@PostMapping
	ResponseEntity<UserResponse> create(@RequestBody User user){
		User req = modelMapper.map(user, User.class);
		UserResponse resp = modelMapper.map(userService.create(req), UserResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody User user){
		User req = modelMapper.map(user, User.class);
		UserResponse resp = modelMapper.map(userService.update(req, id), UserResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

}
