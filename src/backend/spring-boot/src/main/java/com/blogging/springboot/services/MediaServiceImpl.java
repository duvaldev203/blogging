package com.blogging.springboot.services;

import com.blogging.springboot.configs.AppConstants;
import com.blogging.springboot.exceptions.BADException;
import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.Media;
import com.blogging.springboot.repositories.MediaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MediaServiceImpl implements  MediaService {

	private final MediaRepository mediaRepo;

	private final ProfileService profileService;

	public MediaServiceImpl(MediaRepository mediaRepo, ProfileService profileService) {
		this.mediaRepo = mediaRepo;
		this.profileService = profileService;
	}

	@Override
	public List<Media> index() {
		return mediaRepo.findAll();
	}

	@Override
	public Media show(Long id) {
		return mediaRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Media", id));
	}

	@Override
	public Media create(Media media) {
		return mediaRepo.save(media);
	}

	@Override
	public Media update(Media media, Long id) {
		try {
			Media old = mediaRepo.findById(id).orElseThrow(
							() -> new NotFoundException("Media", id));
			media.setId(id);
			if (media.getUrl() == null) {
				media.setUrl(old.getUrl());
			} else {
				Path toDelete = Paths.get(AppConstants.DEFAULT_MEDIAS_PATH, old.getUrl());
				if (Files.exists(toDelete)) {
					Files.delete(toDelete);
				}
			}
			return mediaRepo.save(media);
		} catch (IOException e) {
			throw new BADException("Echec de la modification du media !!!");
		}
	}

	@Override
	public ResponseEntity<?> delete(Long id) {
		Media media = mediaRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Media", id));
		mediaRepo.delete(media);
		return ResponseEntity.noContent().build();
	}

	@Override
	public ResponseEntity<byte[]> getImage(Long mediaId) {
		Media media = mediaRepo.findById(mediaId).orElseThrow(() -> new NotFoundException("Media",mediaId));
		String cheminFichierImage = AppConstants.DEFAULT_MEDIAS_PATH + "/" + media.getUrl();
		return profileService.getProfileByName(cheminFichierImage);
	}

}
