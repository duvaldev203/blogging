package com.blogging.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleRequest {
	private String title;

	private String cover;

	private String content;

	private int totalViews;

	private int readingTime;

	private UserResponse user;

	private CategoryResponse category;

	private ReactionResponse reactions;

	private List<TagResponse> tags;
}

