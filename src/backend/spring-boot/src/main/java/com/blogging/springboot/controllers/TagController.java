package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.ArticleResponse;
import com.blogging.springboot.dto.TagRequest;
import com.blogging.springboot.dto.TagResponse;
import com.blogging.springboot.models.Tag;
import com.blogging.springboot.services.TagService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {

	private final ModelMapper modelMapper;

	private final TagService tagService;

	@Autowired
	public TagController (ModelMapper modelMapper, TagService tagService){
		this.modelMapper = modelMapper;
		this.tagService = tagService;
	}

	@GetMapping
	ResponseEntity<List<TagResponse>> index(){
		List<TagResponse> tags = tagService.index().stream().map(
						el -> modelMapper.map(el, TagResponse.class)).toList();
		return new ResponseEntity<>(tags, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('BLOGGER','ADMIN')")
	ResponseEntity<TagResponse> show(@PathVariable Long id){
		TagResponse tag = modelMapper.map(tagService.show(id), TagResponse.class);
		return new ResponseEntity<>(tag, HttpStatus.OK);
	}

	@PostMapping
	ResponseEntity<TagResponse> create(@RequestBody @Valid TagRequest tag){
		Tag req = modelMapper.map(tag, Tag.class);
		TagResponse resp = modelMapper.map(tagService.create(req), TagResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('BLOGGER','ADMIN')")
	ResponseEntity<TagResponse> update(@PathVariable Long id, @RequestBody @Valid TagRequest tag){
		Tag req = modelMapper.map(tag, Tag.class);
		TagResponse resp = modelMapper.map(tagService.update(req, id), TagResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@GetMapping("/records/{keywords}")
	public ResponseEntity<List<TagResponse>> recods(@PathVariable String keywords){
		List<Tag> articles = tagService.records(keywords);
		List<TagResponse> resp = articles.stream().map(el -> modelMapper.map(el, TagResponse.class)).toList();
		return new ResponseEntity<>(resp, HttpStatus.OK);
	}

}
