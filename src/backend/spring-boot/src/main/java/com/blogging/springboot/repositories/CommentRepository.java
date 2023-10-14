package com.blogging.springboot.repositories;

import com.blogging.springboot.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
