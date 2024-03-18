package com.blogging.springboot.controllers;

import com.blogging.springboot.dto.CategoryRequest;
import com.blogging.springboot.dto.CategoryResponse;
import com.blogging.springboot.models.Category;
import com.blogging.springboot.services.CategoryService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	private final ModelMapper modelMapper;

	private final CategoryService categoryService;

	@Autowired
	public CategoryController(ModelMapper modelMapper, CategoryService categoryService) {
		this.modelMapper = modelMapper;
		this.categoryService = categoryService;
	}

	@GetMapping
	ResponseEntity<List<CategoryResponse>> index() {
		List<CategoryResponse> categories = categoryService.index().stream().map(
				el -> modelMapper.map(el, CategoryResponse.class)).toList();
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<CategoryResponse> show(@PathVariable Long id) {
		CategoryResponse category = modelMapper.map(categoryService.show(id), CategoryResponse.class);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('BLOGGER')")
	ResponseEntity<CategoryResponse> create(@RequestBody @Valid CategoryRequest category) {
		Category req = modelMapper.map(category, Category.class);
		CategoryResponse resp = modelMapper.map(categoryService.create(req), CategoryResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('BLOGGER')")
	ResponseEntity<CategoryResponse> update(@PathVariable Long id, @RequestBody @Valid CategoryResponse category) {
		Category req = modelMapper.map(category, Category.class);
		CategoryResponse resp = modelMapper.map(categoryService.update(req, id), CategoryResponse.class);
		return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
	}

	@GetMapping("/records/{keywords}")
	public ResponseEntity<List<CategoryResponse>> records(@PathVariable String keywords) {
		List<Category> articles = categoryService.records(keywords);
		List<CategoryResponse> resp = articles.stream().map(el -> modelMapper.map(el, CategoryResponse.class)).toList();
		return new ResponseEntity<>(resp, HttpStatus.OK);
	}
}
