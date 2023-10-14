package com.blogging.springboot.services;

import com.blogging.springboot.models.Comment;
import com.blogging.springboot.repositories.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements  CommentService {

	private final CommentRepository commentRepo;

	public CommentServiceImpl(CommentRepository commentRepo) {
		this.commentRepo = commentRepo;
	}

	@Override
	public List<Comment> index() {
		return commentRepo.findAll();
	}

	@Override
	public Comment show(Long id) {
		return commentRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException("Not Found !!!"));
	}

	@Override
	public Comment create(Comment comment) {
		return commentRepo.save(comment);
	}

	@Override
	public Comment update(Comment comment, Long id) {
		commentRepo.findById(id).orElseThrow(
						() -> new EntityNotFoundException(String.format("Le commentaire d'id %d n'a pas ete trouve", id)));
		comment.setId(id);
		return commentRepo.save(comment);
	}

}
