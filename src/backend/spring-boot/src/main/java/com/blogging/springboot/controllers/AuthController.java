package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.SignInRequest;
import com.blogging.springboot.dto.SignResponse;
import com.blogging.springboot.dto.UserRequest;
import com.blogging.springboot.dto.UserResponse;
import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.manager.JWTUtil;
import com.blogging.springboot.models.User;
import com.blogging.springboot.repositories.UserRepository;
import com.blogging.springboot.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@SecurityRequirement(name = "Tracking Application")
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	public AuthController() {
	}

	@PostMapping("/register")
	public ResponseEntity<SignResponse> register(@Valid @RequestBody UserRequest user) throws NotFoundException {

		userService.create(modelMapper.map(user, User.class));

		SignInRequest login = new SignInRequest(
				user.getEmail(), user.getPassword()
		);
		return login(login);
	}

	@PostMapping("/login")
	public ResponseEntity<SignResponse> login(@Valid @RequestBody SignInRequest request) {

		UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(
				request.getEmail(), request.getPassword());

		authenticationManager.authenticate(authCredentials);

		String token = jwtUtil.generateToken(request.getEmail());

		User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User", "Email", request.getEmail()));
		UserResponse userResponse = modelMapper.map(user, UserResponse.class);

		SignResponse resp = new SignResponse(userResponse, token);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}
	@GetMapping(value = "/refreshtoken")
	public ResponseEntity<?> refreshtoken(HttpServletRequest request) throws Exception {
		return null;
	}

	@GetMapping("/logout")
	public ResponseEntity<Void> logout(SignResponse authInfo) {

		return ResponseEntity.noContent().build();
	}
}