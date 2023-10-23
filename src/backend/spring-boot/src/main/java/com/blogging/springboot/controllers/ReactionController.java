package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.ReactionRequest;
import com.blogging.springboot.dto.ReactionResponse;
import com.blogging.springboot.models.Reaction;
import com.blogging.springboot.services.ReactionService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reactions")
public class ReactionController {

	private final ModelMapper modelMapper;

	private final ReactionService reactionService;

	@Autowired
	public ReactionController (ModelMapper modelMapper, ReactionService reactionService){
		this.modelMapper = modelMapper;
		this.reactionService = reactionService;
	}

	@GetMapping
	ResponseEntity<List<ReactionResponse>> index(){
		List<ReactionResponse> reactions = reactionService.index().stream().map(
						el -> modelMapper.map(el, ReactionResponse.class)).toList();
		return new ResponseEntity<>(reactions, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<ReactionResponse> show(@PathVariable Long id){
		ReactionResponse reaction = modelMapper.map(reactionService.show(id), ReactionResponse.class);
		return new ResponseEntity<>(reaction, HttpStatus.FOUND);
	}

	@PostMapping
	ResponseEntity<ReactionResponse> create(@RequestBody @Valid ReactionRequest reaction){
		Reaction req = modelMapper.map(reaction, Reaction.class);
		ReactionResponse resp = modelMapper.map(reactionService.create(req), ReactionResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<ReactionResponse> update(@PathVariable Long id, @RequestBody @Valid ReactionRequest reaction){
		Reaction req = modelMapper.map(reaction, Reaction.class);
		ReactionResponse resp = modelMapper.map(reactionService.update(req, id), ReactionResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> delete(@PathVariable Long id){
		return reactionService.delete(id);
	}
}
