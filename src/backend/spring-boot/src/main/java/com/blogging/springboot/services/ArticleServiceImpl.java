package com.blogging.springboot.services;

import com.blogging.springboot.models.Article;
import com.blogging.springboot.repositories.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements  ArticleService {

	private final ArticleRepository articleRepo;

	public ArticleServiceImpl(ArticleRepository articleRepo) {
		this.articleRepo = articleRepo;
	}

	@Override
	public List<Article> index() {
		return articleRepo.findAll();
	}

	@Override
	public Article show(Long id) {
		return articleRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException("Not Found !!!"));
	}

	@Override
	public Article create(Article article) {
		return articleRepo.save(article);
	}

	@Override
	public Article update(Article article, Long id) {
		articleRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("L'article d'id %d n'a pas ete trouve", id)));
		article.setId(id);
		return articleRepo.save(article);
	}

	@Override
	public ResponseEntity<?> delete(Long id) {
		Article article = articleRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("L'article d'id %d n'a pas ete trouve", id)));
		articleRepo.delete(article);
		return ResponseEntity.noContent().build();
	}
}
