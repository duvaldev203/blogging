package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.CommentRequest;
import com.blogging.springboot.dto.CommentResponse;
import com.blogging.springboot.models.Comment;
import com.blogging.springboot.services.CommentService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

	private final ModelMapper modelMapper;

	private final CommentService commentService;

	@Autowired
	public CommentController (ModelMapper modelMapper, CommentService commentService){
		this.modelMapper = modelMapper;
		this.commentService = commentService;
	}

	@GetMapping
	ResponseEntity<List<CommentResponse>> index(){
		List<CommentResponse> comments = commentService.index().stream().map(
						el -> modelMapper.map(el, CommentResponse.class)).toList();
		return new ResponseEntity<>(comments, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<CommentResponse> show(@PathVariable Long id){
		CommentResponse comment = modelMapper.map(commentService.show(id), CommentResponse.class);
		return new ResponseEntity<>(comment, HttpStatus.FOUND);
	}

	@PostMapping
	ResponseEntity<CommentResponse> create(@RequestBody @Valid CommentRequest comment){
		Comment req = modelMapper.map(comment, Comment.class);
		CommentResponse resp = modelMapper.map(commentService.create(req), CommentResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<CommentResponse> update(@PathVariable Long id, @RequestBody @Valid CommentRequest comment){
		Comment req = modelMapper.map(comment, Comment.class);
		CommentResponse resp = modelMapper.map(commentService.update(req, id), CommentResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

}
