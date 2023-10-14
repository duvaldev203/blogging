package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
