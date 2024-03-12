package com.blogging.springboot.controllers;

import com.blogging.springboot.configs.AppConstants;
import com.blogging.springboot.configs.AppFunctions;
import com.blogging.springboot.dto.MediaRequest;
import com.blogging.springboot.dto.MediaResponse;
import com.blogging.springboot.models.Media;
import com.blogging.springboot.services.MediaService;
import com.google.gson.Gson;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/medias")
public class MediaController {

	private final ModelMapper modelMapper;

	private final MediaService mediaService;

	@Autowired
	public MediaController (ModelMapper modelMapper, MediaService mediaService){
		this.modelMapper = modelMapper;
		this.mediaService = mediaService;
	}

	@GetMapping
	ResponseEntity<List<MediaResponse>> index(){
		List<MediaResponse> medias = mediaService.index().stream().map(
						el -> modelMapper.map(el, MediaResponse.class)).toList();
		return new ResponseEntity<>(medias, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('BLOGGER')")
	ResponseEntity<MediaResponse> show(@PathVariable Long id){
		MediaResponse media = modelMapper.map(mediaService.show(id), MediaResponse.class);
		return new ResponseEntity<>(media, HttpStatus.OK);
	}

	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@PreAuthorize("hasAuthority('BLOGGER')")
	ResponseEntity<MediaResponse> create(@RequestParam @Valid String media, @RequestParam("file") MultipartFile file){
//		Media req = modelMapper.map(media, Media.class);
		Media req = new Gson().fromJson(media, Media.class);
		req.setType(file.getContentType());
		req.setUrl(AppFunctions.copyImgToPath(file, AppConstants.DEFAULT_MEDIAS_PATH));
		MediaResponse resp = modelMapper.map(mediaService.create(req), MediaResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<MediaResponse> update(@PathVariable Long id, @RequestBody @Valid MediaRequest media){
		Media req = modelMapper.map(media, Media.class);
		MediaResponse resp = modelMapper.map(mediaService.update(req, id), MediaResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@PutMapping(value = "/updateMedia/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<MediaResponse> updateMedia(@PathVariable Long id, @RequestParam @Valid String media, @RequestParam("file") MultipartFile file){
		Media req = new Gson().fromJson(media, Media.class);
//		Article req = modelMapper.map(article, Article.class);
		req.setType(file.getContentType());
		req.setUrl(AppFunctions.copyImgToPath(file, AppConstants.DEFAULT_MEDIAS_PATH));
		System.out.println(req);
		MediaResponse resp = modelMapper.map(mediaService.update(req, id), MediaResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> delete(@PathVariable Long id){
		return mediaService.delete(id);
	}

	@GetMapping("/getImage/{mediaId}")
	public ResponseEntity<byte[]> getImage(@PathVariable Long mediaId) {
		return mediaService.getImage(mediaId);
	}

}
