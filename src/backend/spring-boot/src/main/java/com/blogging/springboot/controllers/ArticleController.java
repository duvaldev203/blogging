package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.ArticleResponse;
import com.blogging.springboot.models.Article;
import com.blogging.springboot.services.ArticleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

	private final ModelMapper modelMapper;

	private final ArticleService articleService;

	@Autowired
	public ArticleController (ModelMapper modelMapper, ArticleService articleService){
		this.modelMapper = modelMapper;
		this.articleService = articleService;
	}

	@GetMapping
	ResponseEntity<List<ArticleResponse>> index(){
		List<ArticleResponse> articles = articleService.index().stream().map(
						el -> modelMapper.map(el, ArticleResponse.class)).toList();
		return new ResponseEntity<>(articles, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<ArticleResponse> show(@PathVariable Long id){
		ArticleResponse article = modelMapper.map(articleService.show(id), ArticleResponse.class);
		return new ResponseEntity<>(article, HttpStatus.FOUND);
	}

	@PostMapping
	ResponseEntity<ArticleResponse> create(@RequestBody Article article){
		Article req = modelMapper.map(article, Article.class);
		ArticleResponse resp = modelMapper.map(articleService.create(req), ArticleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	ResponseEntity<ArticleResponse> update(@PathVariable Long id, @RequestBody Article article){
		Article req = modelMapper.map(article, Article.class);
		ArticleResponse resp = modelMapper.map(articleService.update(req, id), ArticleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<?> delete(@PathVariable Long id){
		return articleService.delete(id);
	}
}
