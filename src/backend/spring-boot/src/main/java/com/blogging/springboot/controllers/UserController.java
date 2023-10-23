package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.ProfileResponse;
import com.blogging.springboot.dto.UserRequest;
import com.blogging.springboot.dto.UserResponse;
import com.blogging.springboot.models.User;
import com.blogging.springboot.services.ProfileService;
import com.blogging.springboot.services.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

	private final ModelMapper modelMapper;

	private final UserService userService;

	private final ProfileService profileService;

	@Autowired
	public UserController (ModelMapper modelMapper, UserService userService, ProfileService profileService){
		this.modelMapper = modelMapper;
		this.userService = userService;
		this.profileService = profileService;
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
	ResponseEntity<UserResponse> create(@RequestBody @Valid UserRequest user) throws IOException {
		user.setProfile(modelMapper.map(profileService.setDefaultProfile(user.getEmail()), ProfileResponse.class));
		User req = modelMapper.map(user, User.class);
		UserResponse resp = modelMapper.map(userService.create(req), UserResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<UserResponse> update(@PathVariable Long id, @RequestBody @Valid UserRequest user){
		User req = modelMapper.map(user, User.class);
		UserResponse resp = modelMapper.map(userService.update(req, id), UserResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@PutMapping(value = "/profile/{id}", consumes = {"multipart/form-data"})
	public ResponseEntity<ProfileResponse> changeProfile(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
		ProfileResponse saved = modelMapper.map(profileService.changeProfileImage(id, image), ProfileResponse.class);
		return  new ResponseEntity<>(saved, HttpStatus.ACCEPTED);
	}

	@GetMapping("/profile/{profileId}")
	public ResponseEntity<byte[]> getProfileImage(@PathVariable Long profileId){
		return profileService.getProfileImage(profileId);
	}
}
