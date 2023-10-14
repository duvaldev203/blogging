package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.MediaResponse;
import com.blogging.springboot.models.Media;
import com.blogging.springboot.services.MediaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	ResponseEntity<MediaResponse> show(@PathVariable Long id){
		MediaResponse media = modelMapper.map(mediaService.show(id), MediaResponse.class);
		return new ResponseEntity<>(media, HttpStatus.FOUND);
	}

	@PostMapping
	ResponseEntity<MediaResponse> create(@RequestBody Media media){
		Media req = modelMapper.map(media, Media.class);
		MediaResponse resp = modelMapper.map(mediaService.create(req), MediaResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<MediaResponse> update(@PathVariable Long id, @RequestBody Media media){
		Media req = modelMapper.map(media, Media.class);
		MediaResponse resp = modelMapper.map(mediaService.update(req, id), MediaResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> delete(@PathVariable Long id){
		return mediaService.delete(id);
	}
}
