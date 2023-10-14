package com.blogging.springboot.services;

import com.blogging.springboot.models.Media;
import com.blogging.springboot.repositories.MediaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaServiceImpl implements  MediaService {

	private final MediaRepository mediaRepo;

	public MediaServiceImpl(MediaRepository mediaRepo) {
		this.mediaRepo = mediaRepo;
	}

	@Override
	public List<Media> index() {
		return mediaRepo.findAll();
	}

	@Override
	public Media show(Long id) {
		return mediaRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException("Not Found !!!"));
	}

	@Override
	public Media create(Media media) {
		return mediaRepo.save(media);
	}

	@Override
	public Media update(Media media, Long id) {
		mediaRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("Le media d'id %d n'a pas ete trouve", id)));
		media.setId(id);
		return mediaRepo.save(media);
	}

	@Override
	public ResponseEntity<?> delete(Long id) {
		Media media = mediaRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("Le media d'id %d n'a pas ete trouve", id)));
		mediaRepo.delete(media);
		return ResponseEntity.noContent().build();
	}
}
