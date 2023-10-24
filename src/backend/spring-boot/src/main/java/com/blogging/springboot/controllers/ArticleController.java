package com.blogging.springboot.controllers;

import com.blogging.springboot.configs.AppConstants;
import com.blogging.springboot.configs.AppFunctions;
import com.blogging.springboot.dto.ArticleRequest;
import com.blogging.springboot.dto.ArticleResponse;
import com.blogging.springboot.models.Article;
import com.blogging.springboot.services.ArticleService;
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

	@PostMapping(value = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@PreAuthorize("hasAnyAuthority('ADMIN','BLOGGER')")
	ResponseEntity<ArticleResponse> create(@RequestParam @Valid String article, @RequestParam("file") MultipartFile file) {
		System.out.println("Ligne 49 du controller de article \n" + article);
		Article req = new Gson().fromJson(article, Article.class);
//		Article req = modelMapper.map(article, Article.class);
		req.setCover(AppFunctions.copyImgToPath(file, AppConstants.DEFAULT_ARTICLES_PATH));
		System.out.println(req);
		ArticleResponse resp = modelMapper.map(articleService.create(req), ArticleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('BLOGGER','ADMIN')")
	ResponseEntity<ArticleResponse> update(@PathVariable Long id, @RequestBody @Valid ArticleRequest article){
		Article req = modelMapper.map(article, Article.class);
		ArticleResponse resp = modelMapper.map(articleService.update(req, id), ArticleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@PutMapping(value = "/updateCover/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@PreAuthorize("hasAnyAuthority('BLOGGER','ADMIN')")
	public ResponseEntity<ArticleResponse> changeCover(@PathVariable Long id, @RequestParam @Valid String article, @RequestParam("cover") MultipartFile cover){
		Article req = new Gson().fromJson(article, Article.class);
//		Article req = modelMapper.map(article, Article.class);
		req.setCover(AppFunctions.copyImgToPath(cover, AppConstants.DEFAULT_ARTICLES_PATH));
		System.out.println(req);
		ArticleResponse resp = modelMapper.map(articleService.update(req, id), ArticleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('BLOGGER','ADMIN')")
	ResponseEntity<?> delete(@PathVariable Long id){
		return articleService.delete(id);
	}

	@PutMapping("/read/{id}")
	ResponseEntity<ArticleResponse> readOne(@PathVariable Long id) {
		ArticleResponse resp = modelMapper.map(articleService.readOne(id), ArticleResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@GetMapping("/getCover/{articleId}")
	public ResponseEntity<byte[]> getCover(@PathVariable Long articleId) {
		return articleService.getCover(articleId);
	}
}
