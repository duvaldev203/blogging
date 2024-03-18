package com.blogging.springboot.services;

import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.Category;
import com.blogging.springboot.models.Tag;
import com.blogging.springboot.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepo;

	public CategoryServiceImpl(CategoryRepository categoryRepo) {
		this.categoryRepo = categoryRepo;
	}

	@Override
	public List<Category> index() {
		return categoryRepo.findAll();
	}

	@Override
	public Category show(Long id) {
		return categoryRepo.findById(id).orElseThrow(
				() -> new NotFoundException("Categorie", id));
	}

	@Override
	public Category create(Category category) {
		return categoryRepo.save(category);
	}

	@Override
	public Category update(Category category, Long id) {
		categoryRepo.findById(id).orElseThrow(
				() -> new NotFoundException("Categorie", id));
		category.setId(id);
		return categoryRepo.save(category);
	}

	@Override
	public List<Category> records(String keywords) {
		return categoryRepo.findByNameContaining(keywords);
	}

}
