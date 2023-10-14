package com.blogging.springboot.services;

import com.blogging.springboot.dto.ArticleRequest;
import com.blogging.springboot.dto.ArticleResponse;
import com.blogging.springboot.models.Article;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ArticleService {
	List<Article> index();

	Article show(Long id);

	Article create(Article article);

	Article update(Article article, Long id);

	ResponseEntity<?> delete(Long id);
}
