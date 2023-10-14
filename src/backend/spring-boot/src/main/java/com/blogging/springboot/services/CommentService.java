package com.blogging.springboot.services;

import com.blogging.springboot.dto.CommentRequest;
import com.blogging.springboot.dto.CommentResponse;
import com.blogging.springboot.models.Comment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
	List<Comment> index();

	Comment show(Long id);

	Comment create(Comment comment);

	Comment update(Comment comment, Long id);
}
