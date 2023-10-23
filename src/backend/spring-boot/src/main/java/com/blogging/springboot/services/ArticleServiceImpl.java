package com.blogging.springboot.services;

import com.blogging.springboot.configs.AppConstants;
import com.blogging.springboot.exceptions.BADException;
import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.models.Article;
import com.blogging.springboot.repositories.ArticleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ArticleServiceImpl implements  ArticleService {

	private final ArticleRepository articleRepo;
	private final ProfileService profileService;

	public ArticleServiceImpl(ArticleRepository articleRepo, ProfileService profileService) {
		this.articleRepo = articleRepo;
		this.profileService = profileService;
	}

	@Override
	public List<Article> index() {
		return articleRepo.findAll();
	}

	@Override
	public Article show(Long id) {
		return articleRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Article", id));
	}

	@Override
	public Article create(Article article) {
		article.setTotalViews(0);
		return articleRepo.save(article);
	}

	@Override
	public Article update(Article article, Long id) {
		try {
			Article old = articleRepo.findById(id).orElseThrow(
							() -> new NotFoundException("Article", id));
			article.setId(id);
			article.setTotalViews(old.getTotalViews());
			if (article.getCover() == null) {
				article.setCover(old.getCover());
			} else {
				Path toDelete = Paths.get(AppConstants.DEFAULT_ARTICLES_PATH, old.getCover());
				if (Files.exists(toDelete)) {
					Files.delete(toDelete);
				}
			}
			return articleRepo.save(article);
		} catch (IOException e) {
			throw new BADException("Echec de la modification de la photo de couverture !!!");
		}
	}

	@Override
	public ResponseEntity<?> delete(Long id) {
		Article article = articleRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Article", id));
		articleRepo.delete(article);
		return ResponseEntity.noContent().build();
	}

	public Article readOne(Long id){
		Article old = articleRepo.findById(id).orElseThrow(
						() -> new NotFoundException("Article", id));
		old.setTotalViews(old.getTotalViews() + 1);
		return articleRepo.save(old);
	}

	@Override
	public ResponseEntity<byte[]> getCover(Long articleId) {
		Article article = articleRepo.findById(articleId).orElseThrow(() -> new NotFoundException("Article",articleId));
		String cheminFichierImage = AppConstants.DEFAULT_ARTICLES_PATH + "/" + article.getCover();
		return profileService.getProfileByName(cheminFichierImage);
	}
}
