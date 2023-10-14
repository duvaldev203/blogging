package com.blogging.springboot.services;

import com.blogging.springboot.models.Category;
import com.blogging.springboot.repositories.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements  CategoryService {

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
						() -> new EntityNotFoundException("Not Found !!!"));
	}

	@Override
	public Category create(Category category) {
		return categoryRepo.save(category);
	}

	@Override
	public Category update(Category category, Long id) {
		categoryRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("La categorie d'id %d n'a pas ete trouve", id)));
		category.setId(id);
		return categoryRepo.save(category);
	}

}
