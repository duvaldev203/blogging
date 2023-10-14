package com.blogging.springboot.services;

import com.blogging.springboot.dto.CategoryRequest;
import com.blogging.springboot.dto.CategoryResponse;
import com.blogging.springboot.models.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
	List<Category> index();

	Category show(Long id);

	Category create(Category category);

	Category update(Category category, Long id);
}
