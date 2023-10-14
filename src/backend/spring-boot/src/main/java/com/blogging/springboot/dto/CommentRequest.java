package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
	private String content;

	private UserResponse user;

	private ArticleResponse article;
}
