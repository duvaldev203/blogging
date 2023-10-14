package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReactionResponse {
	private Long id;

	private String type;

	private UserResponse user;

	private ArticleResponse article;

	private Timestamp createdAt;

	private Timestamp updatedAt;
}
