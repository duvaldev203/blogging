package com.blogging.springboot.services;

import com.blogging.springboot.configs.UserInfoConfig;
import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.User;
import com.blogging.springboot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByEmail(username);
		
		return user.map(UserInfoConfig::new).orElseThrow(() -> new NotFoundException("User", "email", username));
	}
}