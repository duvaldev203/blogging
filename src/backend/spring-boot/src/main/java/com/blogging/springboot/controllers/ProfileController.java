package com.blogging.springboot.controllers;

import com.blogging.springboot.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {
	@Autowired
	private ProfileService profileService;

	@GetMapping("/{profileName}")
	public ResponseEntity<byte[]> getProfileByName(@PathVariable String profileName) {
		return profileService.getProfileByName(profileName);
	}
}
