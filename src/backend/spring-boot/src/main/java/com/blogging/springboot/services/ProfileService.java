package com.blogging.springboot.services;

import com.blogging.springboot.models.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
	Profile setDefaultProfile(String email);

	Profile saveProfile(MultipartFile image);

	Profile changeProfileImage(Long id, MultipartFile image);

	ResponseEntity<byte[]> getProfileImage(Long id);

	ResponseEntity<byte[]> getProfileByName(String name);
}
