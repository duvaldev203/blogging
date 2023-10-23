package com.blogging.springboot.services;

import com.blogging.springboot.dto.MediaResponse;
import com.blogging.springboot.models.Media;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MediaService {
	List<Media> index();

	Media show(Long id);

	Media create(Media media);

	Media update(Media media, Long id);

	ResponseEntity<?> delete(Long id);

	ResponseEntity<byte[]> getImage(Long mediaId);
}
